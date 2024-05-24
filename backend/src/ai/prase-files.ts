import axios, { AxiosResponse } from 'axios';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import mammoth from 'mammoth';
import { parseOffice } from 'officeparser'; // Import the 'parseOffice' function from 'officeparser'
import { parseRTF } from 'rtf-parser';

const unicodeRemover = (text: string): string => {
  return text.replace(/[^\x00-\x7F]|\0/g, '');
};

const parsePdfFile = async (blob: Blob): Promise<string | null> => {
  try {
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
    console.error('Error parsing PDF file:', error);
    return null;
  }
};

const parseTxtFile = async (text: string): Promise<string | null> => {
  try {
    // Remove unwanted Unicode characters
    const cleanedText = unicodeRemover(text);
    return cleanedText;
  } catch (error) {
    console.error('Error parsing text file:', error);
    return null;
  }
};

const parseDocxFile = async (arrayBuffer: ArrayBuffer): Promise<string | null> => {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    const cleanedText = unicodeRemover(result.value);
    return cleanedText;
  } catch (error) {
    console.error('Error parsing DOCX file:', error);
    return null;
  }
};

const parseDocFile = async (buffer: Buffer): Promise<string | null> => {
  try {
    return new Promise((resolve, reject) => {
      parseOffice(buffer, (err, doc) => { // Use the 'parseOffice' function from 'officeparser'
        if (err) {
          console.error('Error parsing DOC file:', err);
          reject(null);
        } else {
          const cleanedText = unicodeRemover(doc.toString());
          resolve(cleanedText);
        }
      });
    });
  } catch (error) {
    console.error('Error parsing DOC file:', error);
    return null;
  }
};

const parseRtfFile = async (text: string): Promise<string | null> => {
  try {
    return new Promise((resolve, reject) => {
      parseRTF(text, (err, doc) => {
        if (err) {
          console.error('Error parsing RTF file:', err);
          reject(null);
        } else {
          let content = '';
          doc.content.forEach(element => {
            if (element.type === 'text') {
              content += element.value;
            }
          });
          const cleanedText = unicodeRemover(content);
          resolve(cleanedText);
        }
      });
    });
  } catch (error) {
    console.error('Error parsing RTF file:', error);
    return null;
  }
};

export async function parseFile(file: any): Promise<string | null> {
  try {
    console.log(file)
  } catch (error) {
    console.error('Error fetching or parsing file:', error);
    return null;
  }
}
