import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { FileMetaData, categorizationModes } from "../types/type";

export const CHUNK_SIZE = 2000;
export const CHUNK_OVERLAP = 50;
export const MAX_CHUNKS = 15;
export const MAX_CONTEXT_LENGTH = 2000;
export const SUPPORTED_IMAGES = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
export const PREDEFINED_CATEGORIES = [
  "Technology",
  "Business",
  "Health",
  "Entertainment",
  "Sports",
  "Science",
  "Politics",
  "Education",
  "Arts",
  "Travel",
  "Food",
  "Finance",
  "Fashion",
  "Music",
  "Environment",
] as const;

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

export const PROMPT_TEMPLATES = {
  analysis: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a document analysis expert. Always respond with valid JSON matching this exact schema:
    {{
      "mainTopic": "string (2-3 words)",
      "documentType": "string",
      "keyEntities": ["string"],
      "summary": "string"
    }}`,
    ],
    [
      "user",
      `Analyze this document:
    {context}
    
    Remember:
    - mainTopic must be 2-3 words
    - keyEntities must be an array of 5 or fewer strings
    - summary must be 2-3 complete sentences
    - All JSON fields are required`,
    ],
  ]),

  filename: ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert at generating concise, descriptive filenames.",
    ],
    [
      "user",
      `Generate a descriptive filename based on:
    Main Topic: {mainTopic}
    Document Type: {documentType}
    Summary: {summary}

    Rules:
    - Use 1-4 words
    - Only alphanumeric and hyphens
    - No file extensions
    - Focus on most distinctive aspect

    Return filename only.`,
    ],
  ]),
  typoCorrection: ChatPromptTemplate.fromMessages([
    ["system", "You are an expert at correcting typos in categories."],
    [
      "user",
      `Correct any typos in these categories:
    {categories}

    Return corrected categories as a comma-separated string.`,
    ],
  ]),
  categorization: ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a document categorization expert who follows rules strictly.",
    ],
    [
      "user",
      `Categorize this document using these priority rules:
    {context}

    Document Info:
    - Topic: {mainTopic}
    - Type: {documentType}
    - Summary: {summary}

    Output format: Return ONLY the category name as a plain string, no JSON or explanation.
    
    Remember:
    1. MUST use existing categories if any reasonable match exists
    2. Only use default categories if no existing category fits
    3. Create new category ONLY if no other options fit`,
    ],
  ]),

  analysisImage: ChatPromptTemplate.fromMessages([
    ["system", "You are a document analysis expert specializing in images."],
    [
      "user",
      "Analyze this image and provide valid JSON with mainTopic, documentType, keyEntities, and summary.",
    ],
    ["human", [{ type: "image_url", image_url: "{context}" }]],
  ]),
};

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
      const response = await chain.invoke(docInfo);
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

      return await Promise.all(
        documents.map(async (doc) => {
          try {
            let context = `
          1. Custom Categories (HIGHEST): ${correctedTags}
          2. Existing Categories (MEDIUM): ${existingCategories}
          3. Default Categories (LOW): ${PREDEFINED_CATEGORIES}`;

            if (categorizationMode === "general") {
              context = `
            1. Existing Categories (HIGH): ${existingCategories}
            2. Default Categories (MEDIUM): ${PREDEFINED_CATEGORIES}`;
            }

            const response = await PROMPT_TEMPLATES.categorization
              .pipe(AIClientFactory.getInstance())
              .invoke({
                mainTopic: doc.mainTopic,
                documentType: doc.documentType,
                summary: doc.summary,
                context,
              });

            const category = (response as any).content;
            existingCategories.push(category);

            return {
              category,
              originalDocument: doc,
              error: false,
              isExistingCategory: existingCategories.includes(category),
            };
          } catch (error) {
            return {
              category: "Uncategorized",
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
