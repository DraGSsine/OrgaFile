"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = exports.categorizeDocuments = exports.analyzeDocument = void 0;
const text_splitter_1 = require("langchain/text_splitter");
const mistralai_1 = require("@langchain/mistralai");
const prompts_1 = require("@langchain/core/prompts");
const prase_files_1 = require("./prase-files");
const output_parsers_1 = require("@langchain/core/output_parsers");
const createMistralClient = () => new mistralai_1.ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'ministral-8b-2410',
});
const predefinedCategories = [
    'Technology',
    'Health',
    'Education',
    'Entertainment',
    'Finance',
    'Sports',
    'Science',
    'Art',
    'Travel',
    'Business',
    'Politics',
    'Environment',
    'Culture',
    'Lifestyle',
    'History',
    'Music',
    'Food',
    'Fashion',
    'Religion',
    'Philosophy',
    'Literature',
    'Language',
    'Psychology',
    'Sociology',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Computer Science',
    'Medicine',
    'Law',
    'Economics',
    'Marketing',
    'Management',
    'Accounting',
    'Human Resources',
    'Sales',
    'Customer Service',
    'Operations',
    'Product Management',
    'Project Management',
    'Quality Management',
    'Supply Chain Management',
    'Logistics',
    'Procurement',
    'Research',
    'Development',
];
const analyzeDocument = async (file) => {
    try {
        const parser = new output_parsers_1.JsonOutputParser();
        const mistralClient = createMistralClient();
        const fileContents = await (0, prase_files_1.parseFile)(file);
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            separators: ['\n\n', '\n', '.', '!', '?'],
            chunkOverlap: 50,
        });
        const output = (await splitter.createDocuments([fileContents])).slice(0, 15);
        let contextText = '';
        for (let i = 0; i < output.length; i++) {
            contextText += `${output[i].pageContent.trim()}\n---\n`;
            if (contextText.length > 2000)
                break;
        }
        const promptContent = `Analyze the following document context and provide:
    1. mainTopic: A concise phrase of less than 3 words describing the most specific and distinctive main topic.
    2. documentType: Identify the type of document (e.g., report, article, code, etc.).
    3. keyEntities: List up to 5 important entities (people, companies, technologies, etc.) mentioned.
    4. summary: A brief 2-3 sentence summary of the main points.

    Respond in JSON format`;
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            ['system', 'You are a helpful assistant.'],
            ['user', promptContent],
            ['user', contextText],
        ]);
        const chain = prompt.pipe(mistralClient).pipe(parser);
        const response = await chain.invoke({});
        return response;
    }
    catch (error) {
        console.error('Error analyzing file:', error);
        return null;
    }
};
exports.analyzeDocument = analyzeDocument;
const categorizeDocuments = async (documents, existingCategories) => {
    const categorizations = await Promise.all(documents.map(async (doc) => {
        const categorizePromptContent = `
      Categorize this document STRICTLY following these rules:
      - Return ONLY a single category name
      - predefined categories: ${predefinedCategories.join(', ')}
      - Choose the most specific category that matches the document
      - Respond only with the category name

      Document Details:
      - Main Topic: ${doc.mainTopic}
      - Document Type: ${doc.documentType}
      - File Summary: ${doc.summary}
      `;
        const mistralClient = createMistralClient();
        try {
            const prompt = prompts_1.ChatPromptTemplate.fromMessages([
                ['system', 'You are an expert document categorization assistant.'],
                ['user', categorizePromptContent],
            ]);
            const chain = prompt.pipe(mistralClient);
            const response = await chain.invoke({});
            const cleanCategory = response.content;
            existingCategories.push(cleanCategory);
            return {
                category: cleanCategory,
                originalDocument: doc,
            };
        }
        catch (error) {
            console.error('Error analyzing document:', error);
            return {
                category: 'Uncategorized',
                originalDocument: doc,
                error: true,
            };
        }
    }));
    return categorizations;
};
exports.categorizeDocuments = categorizeDocuments;
const generateFileName = async (documentInfo) => {
    const promptContent = `Generate a descriptive filename based on the following document information:
  Main Topic: ${documentInfo.mainTopic}
  Document Type: ${documentInfo.documentType}
  summary: ${documentInfo.summary}

  Generate filename strictly following these rules:
  - Create a concise filename of 1-4 words
  - Use only alphanumeric characters and hyphens
  - Do NOT include file extension
  - Focus on the most distinctive aspect of the document
  
  respond only with the filename`;
    const mistralClient = createMistralClient();
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        [
            'system',
            'You are an expert at generating concise, descriptive filenames.',
        ],
        ['user', promptContent],
    ]);
    const chain = prompt.pipe(mistralClient);
    try {
        const response = await chain.invoke({});
        console.log('Generated filename:', response);
        return response.content;
    }
    catch (error) {
        console.error('Error generating filename:', error);
        return 'document';
    }
};
exports.generateFileName = generateFileName;
//# sourceMappingURL=ai-setup.js.map