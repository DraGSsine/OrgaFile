import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { parseFile } from './prase-files';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { AiRespone } from 'src/types/type';
export interface AIAnalyzeDocumnetResponse {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}

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
    1. Main Topic: A concise phrase of less than four words describing the most specific and distinctive main topic.
    2. Document Type: Identify the type of document (e.g., report, article, code, etc.).
    3. Key Entities: List up to 5 important entities (people, companies, technologies, etc.) mentioned.
    4. Summary: A brief 2-3 sentence summary of the main points.

    Respond in JSON format like this:
    {{
      "mainTopic": "string",
      "documentType": "string",
      "keyEntities": ["string", "string", ...],
      "summary": "string"
    }}`;

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

export const organizeFilesAnalysis = async (
  documents: Array<{
    mainTopic: string;
    documentType: string;
    keyEntities: string[];
  }>,
  existingCategories: string[],
): Promise<AiRespone> => {
  const parser = new JsonOutputParser<AiRespone>();
  const categorizePromptContent = `Analyze the following documents and categorize them into broad, general categories. Each document should be assigned to up to 3 categories with confidence scores.
  Prioritize using the following existing categories whenever possible: ${existingCategories.join(', ')}.
  If a new category is needed, ensure it's broad and general, containing only one word.

  Documents: ${JSON.stringify(documents).replace(/{/g, '{{').replace(/}/g, '}}')}

  Respond in JSON format like this:
  {{
    "categorizations": [
      {{
        "mainTopic": "string",
        "categories": [
          {{ "name": "string", "confidence": number }},
          {{ "name": "string", "confidence": number }},
          {{ "name": "string", "confidence": number }}
        ]
      }},
    ]
  }}

  Ensure categories are unique and broad. Use exact names from existing categories list where possible.`;

  const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'open-mistral-7b',
  });

  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant.'],
      ['user', categorizePromptContent],
    ]);

    const chain = prompt.pipe(model).pipe(parser);
    const response = await chain.invoke({});
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateFileName = async (documentInfo: {
  mainTopic: string;
  documentType: string;
  keyEntities: string[];
  summary: string;
}) => {
  const promptContent = `Generate a descriptive filename based on the following document information:
  ${JSON.stringify(documentInfo).replace(/{/g, '{{').replace(/}/g, '}}')}.

  The filename should:
  1. Be concise and meaningful, max 20 characters
  2. Include the document type

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
