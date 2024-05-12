import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { PromptTemplate } from 'langchain/prompts';
import { StringOutputParser } from 'langchain/schema/output_parser';
import { oneLine, stripIndent } from 'common-tags';
import { parseFile } from './prase-files';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import { Files } from 'src/schemas/auth.schema';
import { promptContent, systemContent } from './ai-const';

function storeData(output: any, supabaseClient: any, id: string, openai: any) {
  output.forEach(async (doc: any) => {
    const { pageContent, metadata } = doc;
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: pageContent,
    });
    const vectors = embedding.data[0].embedding;
    const { error } = await supabaseClient.from('documents').insert({
      fileid: id,
      content: pageContent,
      metadata: metadata,
      embedding: vectors,
    });

    if (error) {
      console.error('Error storing data:', error);
    }
  });
}

export async function AnalyzeFile(data: Files, type: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const fileContents: string = await parseFile(data.url, type);

    // Split document into relevant chunks for context
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // Increased chunk size
      separators: ['\n\n', '.', '!', '?'], // Adjusted separators
      chunkOverlap: 50,
    });
    const output = await splitter.createDocuments([fileContents]);

    // Store document data
    const supabaseClient = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY,
    );
    storeData(output, supabaseClient, data.id, openai);

    // Construct context sections for prompt
    let contextText = '';
    for (let i = 0; i < output.length; i++) {
      const document = output[i];
      const content = document.pageContent;

      // Limit context to relevant sections
      // Adjust this based on document type and content
      contextText += `${content.trim()}\n---\n`;

      // Limit context to a certain number of characters
      if (contextText.length > 2000) break; // You could adjust this limit
    }

    // Generate prompt
    const prompt = stripIndent`
    ${promptContent}
    Context sections:
    ${contextText}

    Question: What is the main topic of this document? Provide a concise and specific answer.`;

    // Request completion from OpenAI
    const completionResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemContent,
        },
        { role: 'user', content: prompt },
      ],
    });

    // Extract and return the generated message content
    const { message } = completionResponse.choices[0];
    return message.content;
  } catch (error) {
    // Handle any errors gracefully
    console.error('Error analyzing file:', error);
    return null;
  }
}

export const organizeFilesAnalysis = async (topics: string[]) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    // Step 1: Identify broad categories
    const categoriesPrompt = `Identify broad categories present in the following topics: ${topics.join(', ')}
    Response should be in JSON format like this: ["Category1", "Category2", "Category3"]`;
    const categoriesResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'assistant',
          content: categoriesPrompt,
        },
      ],
    });

    const categories = JSON.parse(
      categoriesResponse.choices[0].message.content,
    );

    // Step 2: Assign each topic to a category
    const assignmentsPrompt = `Assign each topic to one of the following categories: ${categories.join(', ')}
    Topics: ${topics.join(', ')}
    Response should be in JSON format like this: {
      "categories": {
          "Category1": ["Topic1", "Topic2"],
          "Category2": ["Topic3"],
          "Category3": ["Topic4", "Topic5"]
      }
    }`;
    const assignmentsResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'assistant',
          content: assignmentsPrompt,
        },
      ],
    });

    const assignments = JSON.parse(
      assignmentsResponse.choices[0].message.content,
    );

    return assignments;
  } catch (error) {
    console.error('Error organizing files:', error);
    throw error;
  }
};
