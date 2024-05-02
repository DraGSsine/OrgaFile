import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import axios, { AxiosResponse } from 'axios';
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

function storeData(
  output: any,
  supabaseClient: any,
  id: mongoose.Types.ObjectId,
  openai: any,
) {
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
      chunkSize: 500,
      separators: ['\n\n', '.', '', ' '],
      chunkOverlap: 50,
    });
    const output = await splitter.createDocuments([fileContents]);

    // Store document data
    const supabaseClient = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY,
    );
    storeData(output, supabaseClient, data.id, openai);

    // Create embedding for question
    const question = 'What is the main topic of this document?';
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: question,
    });
    const [{ embedding }] = embeddingResponse.data;

    // Match documents based on embeddings
    const { data: documents, error: matchError } = await supabaseClient.rpc(
      'match_documents',
      {
        query_embedding: embedding,
        match_threshold: 0.7, // Adjust threshold as needed
        file_match_id: data.id,
        match_count: 3,
      },
    );

    // Handle matching error
    if (matchError) {
      throw new Error('Error matching documents');
    }

    // Construct context sections for prompt
    let contextText = '';
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      const content = document.content;

      // Limit context to relevant sections
      // Adjust this based on document type and content
      contextText += `${content.trim()}\n---\n`;
    }

    // Generate prompt
    const prompt = stripIndent`
    ${promptContent}
    Context sections:
    ${contextText}
    
    Question: ${question}
    `;

    // Request completion from OpenAI
    const completionResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: "assistant",
          content: `${systemContent}`,
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
