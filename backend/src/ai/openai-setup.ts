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

function storeData(output: any, supabaseClient: any, url: string, openai: any) {
  output.forEach(async (doc: any) => {
    const { pageContent, metadata } = doc;
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: pageContent,
    });
    const vectors = embedding.data[0].embedding;
    const { error } = await supabaseClient.from('documents').insert({
      fileid: url,
      content: pageContent,
      metadata: metadata,
      embedding: vectors,
    });

    if (error) {
      console.error('Error storing data:', error);
    }
  });
}
export async function AnalyzeFile(url: string, type: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const fileContents: string = await parseFile(url, type);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ['\n\n', '.', '', ' '],
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([fileContents]);

    const supabaseClient = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_KEY,
    );

    storeData(output, supabaseClient, url, openai);

    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: 'what is data science?',
    });

    const [{ embedding }] = embeddingResponse.data;

    // In production we should handle possible errors
    const { data: documents, error: matchError } = await supabaseClient.rpc(
      'match_documents',
      {
        query_embedding: embedding,
        match_threshold: 0.7,
        file_match_id: url,
        match_count: 1,
      },
    );

    if (matchError) {
      throw new Error('Error matching documents');
    }

    let contextText = '';

    // Concat matched documents
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      const content = document.content;

      contextText += `${content.trim()}\n---\n`;
    }

    const prompt = stripIndent`${oneLine`
    You are an AI-powered document analyzer tasked with summarizing the content of various documents.
    Your goal is to provide a concise summary of the document in one sentence.
  `}

  Context sections:
  ${contextText}

  Question: """
  ${question}
  """

  Answer as markdown (including related code snippets if available):
"`;

    // In production we should handle possible errors
    const completionResponse = await openai.chat.completions({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful Supabase representative.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const {
      id,
      choices: [{ text }],
    } = completionResponse.data;

    return 'response';
  } catch (error) {
    console.error('Error analyzing file:', error);
  }
}
