import * as XLSX from "xlsx";
import * as mammoth from "mammoth";

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  let text = "";
  switch (extension) {
    case "pdf":
      text = await extractFromPDF(file);
      break;
    case "doc":
    case "docx":
      text = await extractFromDOCX(file);
      break;
    case "xlsx":
    case "xls":
      text = await extractFromExcel(file);
      break;
    case "txt":
      text = await extractFromTXT(file);
      break;
    default:
      throw new Error("Unsupported file format");
  }

  // Normalize spaces and lines
  text = text.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();

  // Return the first 2000 characters
  return text.slice(0, 2000);
}

export async function extractFromPDF(file: File): Promise<string> {
  const typedarray = new Uint8Array(await file.arrayBuffer());
  // @ts-ignore
  const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    content.items.forEach((item: any) => {
      text += item.str + " ";
    });
  }
  return text;
}

async function extractFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractFromExcel(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  let text = "";

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    text += `Sheet: ${sheetName}\n`;
    text += XLSX.utils.sheet_to_txt(worksheet) + "\n\n";
  });

  return text;
}

async function extractFromTXT(file: File): Promise<string> {
  const text = await file.text();
  return text;
}
