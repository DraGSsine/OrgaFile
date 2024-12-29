import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { FileMetaData, categorizationModes } from "src/types/type";

export interface AIAnalyzeDocumnetResponse {
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
}

// constants.ts
export const CHUNK_SIZE = 2000;
export const CHUNK_OVERLAP = 50;
export const MAX_CHUNKS = 15;
export const MAX_CONTEXT_LENGTH = 2000;

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

export const PROMPT_TEMPLATES = {
  analysis: ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    [
      "user",
      `Analyze the following document context and provide:
      1. mainTopic: A concise phrase of less than 3 words describing the most specific and distinctive main topic.
      2. documentType: Identify the type of document (e.g., report, article, code, etc.).
      3. keyEntities: List up to 5 important entities (people, companies, technologies, etc.) mentioned.
      4. summary: A brief 2-3 sentence summary of the main points.

      Respond in JSON format`,
    ],
    ["user", "{context}"],
  ]),

  filename: ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert at generating concise, descriptive filenames.",
    ],
    [
      "user",
      `Generate a descriptive filename based on the following document information:
      Main Topic: {mainTopic}
      Document Type: {documentType}
      Summary: {summary}

      Generate filename strictly following these rules:
      - Create a concise filename of 1-4 words
      - Use only alphanumeric characters and hyphens
      - Do NOT include file extension
      - Focus on the most distinctive aspect of the document

      respond only with the filename`,
    ],
  ]),

  categorization: (categoryPrompt: string) =>
    ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert document categorization assistant. Given a document, analyze its content and categorize it following these steps:

      1. Score each possible category based on how well it matches the document's content:
         - Calculate relevance score (0-100) for each category
         - Consider the document's main topic, type, and overall content
         - Higher scores mean better category fit
      `,
      ],
      [
        "user",
        `
        ${categoryPrompt}
      2. Choose the category with the highest relevance score

      Document Details:
      - Main Topic: {mainTopic}
      - Document Type: {documentType}
      - Summary: {summary}
    `,
      ],
    ]),

  typoCorrection: ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant that corrects typos in text."],
    [
      "user",
      `Correct any typos in the following of categories:
      {categories}

      Respond with the corrected list of categories .`,
    ],
  ]),
};

export class AIClientFactory {
  private static instance: any;

  static getInstance(): any {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = "gpt-4o-mini";
    if (!this.instance) {
      if (!apiKey) {
        throw new Error("MISTRAL_API_KEY is not set in environment variables");
      }

      this.instance = new ChatOpenAI({
        apiKey,
        model,
      });
    }
    return this.instance;
  }
}

export class DocumentSplitter {
  private splitter: any;

  constructor() {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      separators: ["\n\n", "\n", ".", "!", "?"],
      chunkOverlap: CHUNK_OVERLAP,
    });
  }

  async split(content: string): Promise<string> {
    const chunks = await this.splitter.createDocuments([content]);
    const limitedChunks = chunks.slice(0, MAX_CHUNKS);

    return limitedChunks.reduce((acc, chunk) => {
      if (acc.length < MAX_CONTEXT_LENGTH) {
        return acc + chunk.pageContent.trim() + "\n---\n";
      }
      return acc;
    }, "");
  }
}

export interface AIAnalyzeDocumentResponse {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}

export class DocumentAnalyzer {
  private splitter: DocumentSplitter;
  private parser: JsonOutputParser<AIAnalyzeDocumentResponse>;

  constructor() {
    this.splitter = new DocumentSplitter();
    this.parser = new JsonOutputParser<AIAnalyzeDocumentResponse>();
  }

  async analyzeDocument(
    file: FileMetaData
  ): Promise<AIAnalyzeDocumentResponse> {
    try {
      const contextText = await this.splitter.split(file.data);
      const chain = PROMPT_TEMPLATES.analysis
        .pipe(AIClientFactory.getInstance())
        .pipe(this.parser);

      return await chain.invoke({ context: contextText });
    } catch (error) {
      console.error("Error analyzing document:", error);
      throw new Error("Failed to analyze document");
    }
  }

  async generateFileName(
    documentInfo: AIAnalyzeDocumentResponse
  ): Promise<string> {
    try {
      const chain = PROMPT_TEMPLATES.filename.pipe(
        AIClientFactory.getInstance()
      );
      const response = await chain.invoke(documentInfo);
      return (response as any).content as string;
    } catch (error) {
      console.error("Error generating filename:", error);
      throw new Error("Failed to generate filename");
    }
  }

  private getCategoryPrompt(
    mode: categorizationModes,
    customTags: string,
    existingCategories: string[]
  ): string {
    const basePrompt = `
      Categorize this document by following these rules:
      1. First, check if the document fits into any of these existing categories:
         ${existingCategories.join(", ")}
    `;
    console.log(
      "------------------------------------------------------------------------------->",
      customTags
    );
    const modeSpecificPrompts = {
      general: `
      Available categories: ${PREDEFINED_CATEGORIES.join(", ")}

      Rules:
      1. Choose ONLY from the available categories above
      2. Return ONLY the category name
      3. Pick the most relevant category based on the document content

      Document Details:
      - Main Topic: {mainTopic}
      - Document Type: {documentType}
      - Summary: {summary}
    `,

      custom: `
      IMPORTANT - Follow these scoring rules in order:

      1. Custom Categories (HIGHEST PRIORITY): ${customTags}
      2. Existing Categories (MEDIUM PRIORITY): ${existingCategories.join(", ")}
      3. Default Categories (LOWEST PRIORITY): ${PREDEFINED_CATEGORIES.join(", ")}

      Strict Rules:
      - You MUST use custom categories if there's ANY reasonable match
      - ONLY fall back to existing or default categories if NO custom category fits
      - Return ONLY the category name, nothing else
      - Do not create new categories
      - Do not modify category names

      Document Details:
      - Main Topic: {mainTopic}
      - Document Type: {documentType}
      - Summary: {summary}
    `,
    };

    return modeSpecificPrompts[mode];
  }

  private async correctTyposInCategories(
    categories: string[]
  ): Promise<string> {
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
      const cleanExistingCategories = [...new Set(existingCategories)]
        .filter((category) => category.trim() !== "")
        .filter((category) => category.toLowerCase() !== "uncategorized");

      // Correct typos in custom tags
      const correctedCustomTags =
        await this.correctTyposInCategories(customTags);

      const categoryPrompt = this.getCategoryPrompt(
        categorizationMode,
        correctedCustomTags,
        cleanExistingCategories
      );

      return await Promise.all(
        documents.map(async (doc) => {
          try {
            const prompt = PROMPT_TEMPLATES.categorization(categoryPrompt);
            const chain = prompt.pipe(AIClientFactory.getInstance());

            const response = await chain.invoke({
              mainTopic: doc.mainTopic,
              documentType: doc.documentType,
              summary: doc.summary,
            });

            const category = (response as any).content as string;

            if (
              !cleanExistingCategories.includes(category) &&
              category.toLowerCase() !== "uncategorized"
            ) {
              cleanExistingCategories.push(category);
            }

            return {
              category,
              originalDocument: doc,
              error: false,
              isExistingCategory: cleanExistingCategories.includes(category),
            };
          } catch (error) {
            console.error("Error categorizing document:", error);
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
      console.error("Error in batch categorization:", error);
      throw new Error("Failed to categorize documents");
    }
  }
}
