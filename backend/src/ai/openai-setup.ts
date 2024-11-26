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

// Configuration for Mistral AI model
const createMistralClient = () =>
  new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'ministral-8b-latest',
  });
const predefinedCategories = [
  'Technology',
  'Health',
  'Education',
  'Entertainment',
  'Finance',
  'Sports',
  'Science',
  'Art',
  'Travel',
  'Business',
  'Politics',
  'Environment',
  'Culture',
  'Lifestyle',
  'History',
  'Music',
  'Food',
  'Fashion',
  'Religion',
  'Philosophy',
];

// Analyze the document and return the main topic, document type, key entities, and summary
export const analyzeDocument = async (
  file: Express.Multer.File,
): Promise<AIAnalyzeDocumnetResponse> => {
  try {
    const parser = new JsonOutputParser<AIAnalyzeDocumnetResponse>();
    const mistralClient = createMistralClient();

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

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant.'],
      ['user', promptContent],
      ['user', contextText],
    ]);

    const chain = prompt.pipe(mistralClient).pipe(parser);
    const response = await chain.invoke({});
    return response;
  } catch (error) {
    console.error('Error analyzing file:', error);
    return null;
  }
};

// Add the files to the perfect folder
export const categorizeDocuments = async (
  documents: DocumentAiInfo[],
  existingCategories: string[],
): Promise<AiRespone[]> => {
  const categorizations = await Promise.all(
    documents.map(async (doc: DocumentAiInfo) => {
      const categorizePromptContent = `
      Your task is to choose the best category name for this document.
      
      Document Details:
      - Main Topic: ${doc.mainTopic}
      - Document Type: ${doc.documentType}
      - File Summary: ${doc.summary}
      
      Existing Categories: ${!existingCategories.length ? 'None' : existingCategories.join(', ')}
      
      Here are some examples of categories: ${predefinedCategories.join(', ')}
      Categorization Guidelines:
      1. Be a broad, overarching category that encompasses the main topic.
      2. Prioritize matching to existing categories.
      3. If no existing category matches well, suggest the most appropriate general category.
      4. Be concise and meaningful.
      5. Your response length should be less than 10 characters.
      
      Respond ONLY with the generated category name.
      `;

      const mistralClient = createMistralClient();

      try {
        const prompt = ChatPromptTemplate.fromMessages([
          ['system', 'You are an expert document categorization assistant.'],
          ['user', categorizePromptContent],
        ]);

        const chain = prompt.pipe(mistralClient);
        const response = (await chain.invoke({})).content as string;
        existingCategories.push(response);
        return {
          category: response,
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
  3. do not include any special characters
  4. do not include file extension

  Respond with only the generated filename.`;

  const mistralClient = createMistralClient();

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a helpful assistant.'],
    ['user', promptContent],
  ]);

  const chain = prompt.pipe(mistralClient);
  const response = await chain.invoke({});
  return response.content as string;
};
