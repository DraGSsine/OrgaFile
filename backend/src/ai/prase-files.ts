import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import axios, { AxiosResponse }  from "axios";
import utf8 from 'utf8';

import { promises as fs } from 'fs';

const unicodeRemover = (text) => {
  return text.replace(/[^\x00-\x7F]|\0/g, "");
}


const parsePdfFile = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob()

    const loader = new PDFLoader(blob)

    const pageLevelDocs = await loader.load()
    const cleanedText = unicodeRemover(pageLevelDocs[0].pageContent);

    return cleanedText;
  } catch (error) {
    console.error("Error parsing file:", error);
    return null;
  }
}


const parseTxtFile = async (url: string) => {
  try {
    const response: AxiosResponse = await axios.get(url);
    if (response.status !== 200) {
      console.error("Error Fetching the:", response.statusText);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error parsing file:", error);
    return null;
  }
}

export async function parseFile(url:string, type:string) {
  const format = type.split('/').pop().toLowerCase();
  switch (format) {
    case "pdf":
      return await parsePdfFile(url);
    case "plain":
      return await parseTxtFile(url);
    default:
      return "Unsupported file format";
  }
}
