import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { parseFile } from './prase-files';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { AiRespone, DocumentAiInfo } from '..//types/type';

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
    model: 'ministral-8b-2410',
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
  'Literature',
  'Language',
  'Psychology',
  'Sociology',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Computer Science',
  'Medicine',
  'Law',
  'Economics',
  'Marketing',
  'Management',
  'Accounting',
  'Human Resources',
  'Sales',
  'Customer Service',
  'Operations',
  'Product Management',
  'Project Management',
  'Quality Management',
  'Supply Chain Management',
  'Logistics',
  'Procurement',
  'Research',
  'Development',
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
    1. mainTopic: A concise phrase of less than 3 words describing the most specific and distinctive main topic.
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
      Categorize this document STRICTLY following these rules:
      - Return ONLY a single category name
      - predefined categories: ${predefinedCategories.join(', ')}
      - Choose the most specific category that matches the document
      - Respond only with the category name

      Document Details:
      - Main Topic: ${doc.mainTopic}
      - Document Type: ${doc.documentType}
      - File Summary: ${doc.summary}
      `;

      const mistralClient = createMistralClient();

      try {
        const prompt = ChatPromptTemplate.fromMessages([
          ['system', 'You are an expert document categorization assistant.'],
          ['user', categorizePromptContent],
        ]);

        const chain = prompt.pipe(mistralClient);
        const response = await chain.invoke({});

        const cleanCategory = response.content as string;
        existingCategories.push(cleanCategory);

        return {
          category: cleanCategory,
          originalDocument: doc,
        };
      } catch (error) {
        console.error('Error analyzing document:', error);
        return {
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

  Generate filename strictly following these rules:
  - Create a concise filename of 1-4 words
  - Use only alphanumeric characters and hyphens
  - Do NOT include file extension
  - Focus on the most distinctive aspect of the document
  
  respond only with the filename`;

  const mistralClient = createMistralClient();

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      'You are an expert at generating concise, descriptive filenames.',
    ],
    ['user', promptContent],
  ]);

  const chain = prompt.pipe(mistralClient);

  try {
    const response = await chain.invoke({});
    console.log('Generated filename:', response);
    return response.content as string;
  } catch (error) {
    console.error('Error generating filename:', error);
    return 'document';
  }
};
