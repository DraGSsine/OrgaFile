import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { stripIndent } from 'common-tags';
import { parseFile } from './prase-files';
import { Files } from 'src/schemas/auth.schema';
import { promptContent } from './ai-const';

export async function AnalyzeFile(data: Files, type: string) {
  const model = new ChatMistralAI({
    temperature: 1,
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-large-latest',
  });

  try {
    const fileContents: string = await parseFile(data.url, type);
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
      const document = output[i];
      const content = document.pageContent;

      contextText += `${content.trim()}\n---\n`;

      // Increased the limit to provide more context
      if (contextText.length > 2000) break;
    }

    const promptContent =
    'You are a helpful assistant analyzing a document. You are given some context sections from the document. Identify the most specific and distinctive main topic, focusing on unique and distinguishing aspects. If the context discusses something famous or well-known, prioritize that as the main topic. Provide the main topic strictly in less than four words, being as concise and specific as possible. Avoid adding unnecessary words.';
  
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', promptContent],
      ['human', '{input}'],
    ]);
    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      input: contextText,
    });

    // Extract and return the generated message content
    const message = response.content;

    console.log(contextText);
    return message as string;
  } catch (error) {
    console.error('Error analyzing file:', error);
    return null;
  }
}

export const organizeFilesAnalysis = async (topics: string[]) => {
  const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-large-latest',
  });

  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', `Identify broad categories present in the following topics and assign each topic to one of the identified categories: ${topics.join(', ')}
Even if a topic is specific, like a particular TV show, movie, or book, try to assign it to a broader category, like 'TV Shows', 'Movies', or 'Books'.
Response should be in JSON format like this:
{
  data:[
    {
      name: "Category1",
      topics: ["Topic1", "Topic2"]
    },
    {
      name: "Category2",
      topics: ["Topic3", "Topic4"]
    }
  ]
}`],
    ]);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({});
    const assignments = JSON.parse(response.content as string).data;
    return assignments;
  } catch (error) {
    throw error;
  }
}