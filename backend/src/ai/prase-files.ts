const mammoth = require("mammoth");
const XLSX = require("xlsx");
const pdfParse = require("pdf-parse");

const unicodeRemover = (text: string): string => {
  return text.replace(/[^\x00-\x7F]|\0/g, "");
};
const parseDocx = async (file) => {
  try {
    const { value: text } = await mammoth.extractRawText({
      buffer: file.buffer,
    });
    return text;
  } catch (error) {
    throw error;
  }
};
const parseTxtFile = async (text: string): Promise<string | null> => {
  try {
    // Remove unwanted Unicode characters
    const cleanedText = unicodeRemover(text);
    return cleanedText;
  } catch (error) {
    console.error("Error parsing text file:", error);
    return null;
  }
};

const parsePdfFile = async (buffer: Buffer): Promise<string | null> => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF file:", error);
    return null;
  }
};

const cleanText = (text: string): string => {
  // remove {}
  return text.replace(/{/g, "");
};

export async function parseFile(file) {
  let response = "";
  try {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      response = await parseDocx(file);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const workbook = XLSX.read(file.buffer, { type: "buffer" });
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        response += JSON.stringify(data);
      }
    }
    if (file.mimetype === "text/plain") {
      return await parseTxtFile(file.buffer.toString());
    } else if (file.mimetype === "application/pdf") {
      response = await parsePdfFile(file.buffer);
    } else {
      return "General";
    }
  } catch (error) {
    console.error("Error fetching or parsing file:", error);
    return null;
  }
  return cleanText(response);
}
