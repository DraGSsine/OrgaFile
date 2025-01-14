import * as XLSX from "xlsx";
import * as mammoth from "mammoth";
import { fileTypeFromBlob } from "file-type";
import { getPresignedUrl } from "./action";

export async function extractTextFromFile(
  file: File,
  key: string
): Promise<string> {
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
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
      text = await getImagePresignedUrl(key);
      break;
    default:
      throw new Error("Unsupported file format");
  }

  // Normalize spaces and lines
  text = text.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();
  // Return the first 2000 characters
  return text.slice(0, 2000);
}
async function getImagePresignedUrl(key: string) {
  const url = await getPresignedUrl(key);
  return url;
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

// Define supported extensions and their corresponding actual file signatures

export async function validateFileType(
  file: File
): Promise<{ isValid: boolean; detectedType: string | null }> {
  const SUPPORTED_EXTENSIONS = {
    pdf: ["pdf"],
    png: ["png"],
    jpg: ["jpg", "jpeg"],
    jpeg: ["jpg", "jpeg"],
    gif: ["gif"],
    webp: ["webp"],
    doc: ["doc"],
    docx: ["docx"],
    xlsx: ["xlsx"],
    txt: ["txt"],
  } as const;
  // Get the claimed extension from the filename
  const claimedExtension = file.name.split(".").pop()?.toLowerCase() || "";

  if (!claimedExtension || !(claimedExtension in SUPPORTED_EXTENSIONS)) {
    return { isValid: false, detectedType: null };
  }

  // Special case for .txt files since they don't have a binary signature
  if (claimedExtension === "txt") {
    try {
      // Try to read the file as text
      await file.text();
      return { isValid: true, detectedType: "txt" };
    } catch {
      return { isValid: false, detectedType: null };
    }
  }

  try {
    // Detect the actual file type from its content
    const fileType = await fileTypeFromBlob(file);

    // If we couldn't detect the type and it's not a txt file, reject it
    if (!fileType) {
      return { isValid: false, detectedType: null };
    }

    // Get the actual extension from the detected mime type
    const detectedExt = fileType.ext;

    // Check if the detected type matches any of the allowed types for the claimed extension
    const allowedTypes = SUPPORTED_EXTENSIONS[
      claimedExtension as keyof typeof SUPPORTED_EXTENSIONS
    ] as unknown as any[];
    const isValid = allowedTypes.includes(detectedExt);

    return {
      isValid,
      detectedType: detectedExt,
    };
  } catch (error) {
    console.error("Error validating file type:", error);
    return { isValid: false, detectedType: null };
  }
}
