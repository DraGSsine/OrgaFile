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
  "Science",
  "Health",
  "Education",
  "Entertainment",
  "Sports",
  "Politics",
  "News",
  "Finance",
  "Travel",
  "Food",
  "Fashion",
  "Music",
  "Art",
  "Lifestyle",
  "Gaming",
  "Photography",
  "Literature",
  "History",
  "Environment",
  "Culture",
  "Social Media",
  "Marketing",
  "Design",
  "Programming",
  "Legal",
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
    ["user", "Analyze this document:{context}"],
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
  categorizationCustom: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a categorization expert who creates consistent, general-purpose categories. Follow these rules strictly:

      1. Prioritize custom categories (HIGHEST priority) if they clearly match the file's content
      2. If no custom category fits, use existing categories (SECOND priority) if they clearly match
      3. If neither custom nor existing categories fit, use predefined categories if they match
      4. If no existing category fits, CREATE a new general category following these rules:
         - Must be broad enough to accommodate similar future content
         - Must match the style of existing predefined categories
         - Must be a single word or short phrase (max 2 words)
         - Must be general, not specific (e.g., "Automotive" not "Tesla Cars")
         - Must be professional and widely applicable
         
      Examples of good new categories:
      - For a quantum computing paper: "Science" (use existing) not "Quantum"
      - For car reviews: "Automotive" (new category) not "Cars Reviews"
      - For cooking videos: "Food" (use existing) not "Recipes"
      - For cryptocurrency: "Finance" (use existing) not "Crypto"
      
      When matching, analyze:
      - Main Topic: {mainTopic}
      - Type: {documentType}
      - Summary: {summary}

      Return ONLY the final category name as a plain string.`,
    ],
    [
      "user",
      `Categorize this file using:
      - Custom Categories: {customCategories}
      - Existing Categories: {existingCategories}
      
      Remember: If creating a new category, it must be general-purpose and professional.`,
    ],
  ]),

  categorizationGeneral: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a categorization expert who creates consistent, general-purpose categories. Follow these rules strictly:

      1. Prioritize existing categories if they clearly match the file's content
      2. If no existing category fits, use predefined categories if they match
      3. If no predefined category fits, CREATE a new general category following these rules:
         - Must be broad enough to accommodate similar future content
         - Must match the style of existing predefined categories
         - Must be a single word or short phrase (max 2 words)
         - Must be general, not specific (e.g., "Real Estate" not "Housing Market")
         - Must be professional and widely applicable
         
      Examples of good new categories:
      - For makeup tutorials: "Beauty" (new category) not "Makeup"
      - For space exploration: "Science" (use existing) not "Space"
      - For workout videos: "Fitness" (new category) not "Exercise Videos"
      - For stock market: "Finance" (use existing) not "Stocks"
      
      When matching, analyze:
      - Main Topic: {mainTopic}
      - Type: {documentType}
      - Summary: {summary}

      Return ONLY the final category name as a plain string.`,
    ],
    [
      "user",
      `Categorize this file using:
      - Existing Categories: {existingCategories}
      
      Remember: If creating a new category, it must be general-purpose and professional.`,
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
        categorizationMode === "custom"
          ? PROMPT_TEMPLATES.categorizationCustom
          : PROMPT_TEMPLATES.categorizationGeneral;

      return await Promise.all(
        documents.map(async (doc) => {
          try {
            const chain = promptTemplate.pipe(AIClientFactory.getInstance());

            const response = await chain.invoke({
              mainTopic: doc.mainTopic,
              documentType: doc.documentType,
              keyEntities: doc.keyEntities.join(", "),
              summary: doc.summary,
              existingCategories: existingCategories.join(", "),
              customCategories: correctedTags,
            });

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
