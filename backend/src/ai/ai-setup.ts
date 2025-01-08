import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { FileMetaData, categorizationModes } from "../types/type";
import {
  CHUNK_OVERLAP,
  CHUNK_SIZE,
  MAX_CHUNKS,
  MAX_CONTEXT_LENGTH,
  PROMPT_TEMPLATES,
  SUPPORTED_IMAGES,
} from "./ai-const";

export interface AIAnalyzeDocumentResponse {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}

export interface DocumentAiInfo {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}

export interface AiResponse {
  category: string;
  originalDocument: DocumentAiInfo;
  error?: boolean;
  isExistingCategory?: boolean;
}

export class AIClientFactory {
  private static instance: any;

  static getInstance(): any {
    if (!this.instance) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OPENAI_API_KEY not set");

      this.instance = new ChatOpenAI({
        apiKey,
        model: "gpt-4o-mini",
        temperature: 0.3,
        maxTokens: 500,
      });
    }
    return this.instance;
  }
}

export class DocumentSplitter {
  private splitter: RecursiveCharacterTextSplitter;

  constructor() {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
      separators: ["\n\n", "\n", ".", "!", "?"],
    });
  }

  async split(content: string): Promise<string> {
    const chunks = await this.splitter.createDocuments([content]);
    return chunks
      .slice(0, MAX_CHUNKS)
      .reduce(
        (acc, chunk) =>
          acc.length < MAX_CONTEXT_LENGTH
            ? acc + chunk.pageContent.trim() + "\n---\n"
            : acc,
        ""
      );
  }
}

const analysisFunctionSchema = {
  name: "analyzer",
  description: "Analyzes document content and extracts key information",
  parameters: {
    type: "object",
    properties: {
      mainTopic: {
        type: "string",
        description: "2-3 words describing the main topic",
      },
      documentType: {
        type: "string",
        description: "Type of document",
      },
      keyEntities: {
        type: "array",
        items: { type: "string" },
        description: "Up to 5 important entities",
      },
      summary: {
        type: "string",
        description: "2-3 sentence summary",
      },
    },
    required: ["mainTopic", "documentType", "keyEntities", "summary"],
  },
};

export class DocumentAnalyzer {
  private splitter: DocumentSplitter;
  private parser: JsonOutputFunctionsParser;

  constructor() {
    this.splitter = new DocumentSplitter();
    this.parser = new JsonOutputFunctionsParser();
  }

  async analyzeDocument(
    file: FileMetaData
  ): Promise<AIAnalyzeDocumentResponse> {
    const maxRetries = 3;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const model = AIClientFactory.getInstance().bind({
          functions: [analysisFunctionSchema],
          function_call: { name: "analyzer" },
        });

        if (SUPPORTED_IMAGES.includes(file.format)) {
          const chain = PROMPT_TEMPLATES.analysisImage
            .pipe(model)
            .pipe(this.parser);
          return (await chain.invoke({
            context: file.data,
          })) as AIAnalyzeDocumentResponse;
        } else {
          const contextText = await this.splitter.split(file.data);
          const chain = PROMPT_TEMPLATES.analysis.pipe(model).pipe(this.parser);
          return (await chain.invoke({
            context: contextText,
          })) as AIAnalyzeDocumentResponse;
        }
      } catch (error) {
        if (i === maxRetries - 1)
          throw new Error(`Analysis failed: ${error.message}`);
        console.warn(`Retry ${i + 1}/${maxRetries} due to error`);
      }
    }
    throw new Error("Analysis failed after all retries");
  }

  async generateFileName(docInfo: AIAnalyzeDocumentResponse): Promise<string> {
    try {
      const chain = PROMPT_TEMPLATES.filename.pipe(
        AIClientFactory.getInstance()
      );
      const response = await chain.invoke({
        mainTopic: docInfo?.mainTopic,
        documentType: docInfo?.documentType,
        summary: docInfo?.summary,
      });
      return (response as any).content;
    } catch (error) {
      throw new Error(`Filename generation failed: ${error.message}`);
    }
  }

  private async correctTyposInCategories(
    categories: string[]
  ): Promise<string> {
    if (!categories.length) return "";
    const chain = PROMPT_TEMPLATES.typoCorrection.pipe(
      AIClientFactory.getInstance()
    );
    const response = await chain.invoke({ categories: categories.join(", ") });
    return (response as any).content;
  }

  async categorizeDocuments(
    documents: DocumentAiInfo[],
    existingCategories: string[],
    categorizationMode: categorizationModes,
    customTags: string[]
  ): Promise<AiResponse[]> {
    try {
      const correctedTags = await this.correctTyposInCategories(customTags);
      const promptTemplate =
        categorizationMode == "general"
          ? PROMPT_TEMPLATES.categorizationGeneral
          : PROMPT_TEMPLATES.categorizationCustom;
      console.log("promptTemplate", promptTemplate);
      return await Promise.all(
        documents.map(async (doc) => {
          try {
            const chain = promptTemplate.pipe(AIClientFactory.getInstance());
            const invokeData = () => {
              if (categorizationMode === "general") {
                return {
                  mainTopic: doc.mainTopic,
                  documentType: doc.documentType,
                  keyEntities: doc.keyEntities.join(", "),
                  summary: doc.summary,
                  existingCategories: existingCategories.join(", "),
                };
              } else {
                return {
                  mainTopic: doc.mainTopic,
                  documentType: doc.documentType,
                  keyEntities: doc.keyEntities.join(", "),
                  summary: doc.summary,
                  existingCategories: existingCategories.join(", "),
                  customCategories: correctedTags,
                };
              }
            };
            const response = await chain.invoke(invokeData());

            const category = (response as any).content.trim();

            // Add the new category to existing categories if it's not already there
            if (!existingCategories.includes(category)) {
              existingCategories.push(category);
            }

            return {
              category,
              originalDocument: doc,
              error: false,
              isExistingCategory: existingCategories.includes(category),
            };
          } catch (error) {
            console.error(
              `Categorization error for document: ${doc.mainTopic}`,
              error
            );
            // Create a general fallback category based on the document's main topic
            const chain = promptTemplate.pipe(AIClientFactory.getInstance());
            const fallbackResponse = await chain.invoke({
              mainTopic: doc.mainTopic,
              documentType: "unknown",
              summary: "Error processing document",
              existingCategories: existingCategories.join(", "),
              customCategories: correctedTags,
            });

            const fallbackCategory = (fallbackResponse as any).content.trim();
            return {
              category: fallbackCategory,
              originalDocument: doc,
              error: true,
              isExistingCategory: false,
            };
          }
        })
      );
    } catch (error) {
      throw new Error(`Categorization failed: ${error.message}`);
    }
  }
}
