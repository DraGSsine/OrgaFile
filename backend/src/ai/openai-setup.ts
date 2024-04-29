import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import axios, { AxiosResponse } from 'axios';
import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { PromptTemplate } from 'langchain/prompts';
import { StringOutputParser } from 'langchain/schema/output_parser';
import {
  RunnablePassthrough,
  RunnableSequence,
} from 'langchain/schema/runnable';
import { parseFile } from './prase-files';

function combineDocuments(documents: any): string {
  return documents.map((doc: any) => doc.pageContent).join('\n\n');
}

const answerTemplate = `You are a helpful and enthusiastic support bot who can detect the main topic of a document and you only return max of tow words.
context: {context}
question: {question}
answer: 
`;
export async function AnalyzeFile(url: string) {
  try {
    const fileContents:string = await parseFile(url);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ['\n\n', '.', '', ' '],
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([fileContents]);

    const supabaseClient = createClient(
      'https://erskyucagtvdpcncjkqk.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyc2t5dWNhZ3R2ZHBjbmNqa3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODYwNzUsImV4cCI6MjAyOTk2MjA3NX0.rsc5K1biU4H4biMT0Ctb2GoPOJZgpX0VP8n3Far0-sc',
    );

    const vectorStore = await SupabaseVectorStore.fromDocuments(
      output,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      {
        client: supabaseClient,
        tableName: 'documents',
      },
    );

    //////////////////////////////////////

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const store = new SupabaseVectorStore(embeddings, {
      client: supabaseClient,
      tableName: 'documents',
      queryName: 'match_documents',
    });

    const retriever = store.asRetriever();

    ///////////////////////////////////////

    const openAIApikey = process.env.OPENAI_API_KEY;
    const llm = new ChatOpenAI({
      apiKey: openAIApikey,
    });
    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
    const standaloneQuestionTemplate =
      'Given a question, convert it to a standalone question. question: {question} standalone question:';

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
      standaloneQuestionTemplate,
    );

    const standaloneQuestionChain = standaloneQuestionPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

    const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocuments,
    ]);
    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
      },
      answerChain,
    ]);

    const response = await chain.invoke({
      question: 'What is the main topic of this document?',
    });

    return response;
  } catch (error) {
    console.error('Error analyzing file:', error);
  }
}
