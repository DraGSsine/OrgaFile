import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { parseFile } from './prase-files';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { AiRespone, DocumentAiInfo } from 'src/types/type';

export interface AIAnalyzeDocumnetResponse {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}
// Analyze the document and return the main topic, document type, key entities, and summary
export const analyzeDocument = async (
  file: Express.Multer.File,
): Promise<AIAnalyzeDocumnetResponse> => {
  try {
    const parser = new JsonOutputParser<AIAnalyzeDocumnetResponse>();

    const fileContents: string = await parseFile(file);
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      separators: ['\n\n', '\n', '.', '!', '?'],
      chunkOverlap: 50,
    });
    const output = (await splitter.createDocuments([fileContents])).slice(
      0,
      15,
    );

    let contextText = '';
    for (let i = 0; i < output.length; i++) {
      contextText += `${output[i].pageContent.trim()}\n---\n`;
      if (contextText.length > 2000) break;
    }

    const promptContent = `Analyze the following document context and provide:
    1. mainTopic: A concise phrase of less than four words describing the most specific and distinctive main topic.
    2. documentType: Identify the type of document (e.g., report, article, code, etc.).
    3. keyEntities: List up to 5 important entities (people, companies, technologies, etc.) mentioned.
    4. summary: A brief 2-3 sentence summary of the main points.

    Respond in JSON format`;

    const model = new ChatMistralAI({
      apiKey: process.env.MISTRAL_API_KEY,
      model: 'open-mistral-7b',
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant.'],
      ['user', promptContent],
      ['user', contextText],
    ]);

    const chain = prompt.pipe(model).pipe(parser);
    const response = await chain.invoke({});
    return response;
  } catch (error) {
    console.error('Error analyzing file:', error);
    return null;
  }
};

// add the files to the the perfect folder

export const organizeFilesAnalysis = async (
  documents: DocumentAiInfo[],
  existingCategories: string[],
): Promise<AiRespone[]> => {
  const categorizations = await Promise.all(
    documents.map(async (doc: DocumentAiInfo) => {
      const parser = new JsonOutputParser<AiRespone>();
      const categorizePromptContent = `
      Your task is to categorize a single document into existing categories.
      
      Existing Categories: ${existingCategories.join(', ')}
      
      Document Details:
      - Main Topic: ${doc.mainTopic}
      - Document Type: ${doc.documentType}
      - Key Entities: ${doc.keyEntities.join(', ')}
      
      Rules:
      1. Prioritize matching to existing categories
      2. Use the main topic, document type, and key entities for matching
      3. If no existing category matches well, suggest the most appropriate category
      
      Respond in this JSON format:
      {{
        "mainTopic": "mainTopic",
        "category": "categoryName"
      }}
    `;

      const model = new ChatMistralAI({
        apiKey: process.env.MISTRAL_API_KEY,
        model: 'open-mistral-7b',
      });

      try {
        const prompt = ChatPromptTemplate.fromMessages([
          ['system', 'You are an expert document categorization assistant.'],
          ['user', categorizePromptContent],
        ]);

        const chain = prompt.pipe(model).pipe(parser);
        const response = await chain.invoke({});

        existingCategories.push(response.category);
        return {
          ...response,
          originalDocument: doc,
        };
      } catch (error) {
        console.error('Error analyzing document:', error);
        return {
          mainTopic: doc.mainTopic,
          category: 'Uncategorized',
          originalDocument: doc,
          error: true,
        };
      }
    }),
  );
  return categorizations;
};

// Generate a descriptive filename based on the document information
export const generateFileName = async (documentInfo: {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}) => {
  const promptContent = `Generate a descriptive filename based on the following document information:
  Main Topic: ${documentInfo.mainTopic}
  Document Type: ${documentInfo.documentType}
  summary: ${documentInfo.summary}

  The filename should:
  0. your response length should be less than 15 characters
  1. Be concise and meaningful
  2. Include the document type
  3. not include any special characters
  4. not include file extension

  Respond with only the generated filename.`;

  const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'open-mistral-7b',
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a helpful assistant.'],
    ['user', promptContent],
  ]);

  const chain = prompt.pipe(model);
  const response = await chain.invoke({});
  return response.content as string;
};
