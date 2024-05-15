import axios, { AxiosResponse } from 'axios';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const unicodeRemover = (text) => {
  return text.replace(/[^\x00-\x7F]|\0/g, '');
};

const parsePdfFile = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const loader = new PDFLoader(blob);

    // Extract content from all pages
    const pageLevelDocs = await loader.load();
    let content = '';
    for (let i = 0; i < pageLevelDocs.length; i++) {
      content += pageLevelDocs[i].pageContent;
    }

    // Remove specific unwanted characters
    const cleanedText = content.replace(/[^\w\s]|_/g, '');

    return cleanedText;
  } catch (error) {
    console.error('Error parsing file:', error);
    return null;
  }
};

const parseTxtFile = async (url: string) => {
  try {
    const response:AxiosResponse = await axios.get(url);
    const text = response.data;
    return text;
  } catch (error) {
    console.log(url)
    console.error('Error parsing file:', error);
    return null;
  }
};

export async function parseFile(url: string, type: string) {
  const format = type.split('/').pop().toLowerCase();
  switch (format) {
    case 'pdf':
      return await parsePdfFile(url);
    case 'plain':
      return await parseTxtFile(url);
    default:
      return 'Unsupported file format';
  }
}
