"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = void 0;
const mammoth = require("mammoth");
const XLSX = require("xlsx");
const pdfParse = require("pdf-parse");
const unicodeRemover = (text) => {
    return text.replace(/[^\x00-\x7F]|\0/g, '');
};
const parseDocx = async (file) => {
    try {
        const { value: text } = await mammoth.extractRawText({
            buffer: file.buffer,
        });
        return text;
    }
    catch (error) {
        throw error;
    }
};
const parseTxtFile = async (text) => {
    try {
        const cleanedText = unicodeRemover(text);
        return cleanedText;
    }
    catch (error) {
        console.error('Error parsing text file:', error);
        return null;
    }
};
const parsePdfFile = async (buffer) => {
    try {
        const data = await pdfParse(buffer);
        return data.text;
    }
    catch (error) {
        console.error('Error parsing PDF file:', error);
        return null;
    }
};
async function parseFile(file) {
    try {
        if (file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return await parseDocx(file);
        }
        else if (file.mimetype ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            let text = '';
            for (const sheetName of workbook.SheetNames) {
                const sheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                text += JSON.stringify(data);
            }
            return text;
        }
        if (file.mimetype === 'text/plain') {
            return await parseTxtFile(file.buffer.toString());
        }
        else if (file.mimetype === 'application/pdf') {
            return await parsePdfFile(file.buffer);
        }
        else {
            return "General";
        }
    }
    catch (error) {
        console.error('Error fetching or parsing file:', error);
        return null;
    }
}
exports.parseFile = parseFile;
//# sourceMappingURL=prase-files.js.map