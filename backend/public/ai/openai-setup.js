"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizeFilesAnalysis = exports.analyzeDocument = void 0;
const text_splitter_1 = require("langchain/text_splitter");
const mistralai_1 = require("@langchain/mistralai");
const prompts_1 = require("@langchain/core/prompts");
const prase_files_1 = require("./prase-files");
const analyzeDocument = async (file) => {
    try {
        const fileContents = await (0, prase_files_1.parseFile)(file);
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            separators: ['\n\n', '\n', '.', '!', '?'],
            chunkOverlap: 50,
        });
        const output = (await splitter.createDocuments([fileContents])).slice(0, 15);
        let contextText = '';
        for (let i = 0; i < output.length; i++) {
            const document = output[i];
            const content = document.pageContent;
            contextText += `${content.trim()}\n---\n`;
            if (contextText.length > 2000)
                break;
        }
        const promptContent = `You are a helpful assistant analyzing a document. You are given some context sections from the document.
    Identify the most specific and distinctive main topic, focusing on unique and distinguishing aspects.
    If the context discusses something famous or well-known, prioritize that as the main topic.
    Provide the main topic as a concise phrase of less than four words. Do not include additional explanations or details in your response.
    Respond in the following format: "Main Topic: <your_response>".`;
        const model = new mistralai_1.ChatMistralAI({
            apiKey: process.env.MISTRAL_API_KEY,
            model: 'open-mistral-7b',
        });
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            ['system', 'You are a helpful assistant.'],
            ['user', promptContent],
            ['user', contextText],
        ]);
        const chain = prompt.pipe(model);
        const response = await chain.invoke({});
        const mainTopic = response.content
            .trim()
            .replace(/Main Topic: /, '');
        return mainTopic;
    }
    catch (error) {
        console.error('Error analyzing file:', error);
        return null;
    }
};
exports.analyzeDocument = analyzeDocument;
const organizeFilesAnalysis = async (topics, categories) => {
    const folderPromptContent = `Analyze the following topics and categorize them into broad, general categories. Each topic should be assigned to only one category and should not be changed or rephrased.
  If a topic is specific, like a particular TV show, movie, book, or technology, assign it to a broader category, such as 'TV Shows', 'Movies', 'Books', 'Programming', etc.
  Prioritize using the following existing categories whenever possible: ${categories.join(', ')}. Provide the response in a well-structured JSON format.

  Topics: ${topics.join(', ')}

  Response format example:
  {{
    "data": [
      {{
        "name": "Category1",
        "topics": ["Topic1", "Topic2"]
      }},
      {{
        "name": "Category2",
        "topics": ["Topic3", "Topic4"]
      }}
    ]
  }}

  Ensure that each category has a unique name and that there are no duplicate topics within or across categories. Use the exact topic names provided in the topics list and the exact category names provided in the existing categories list. Make sure the categories are broad and general.
  Ensure that the categories contain only one word as maximum.
  `;
    const model = new mistralai_1.ChatMistralAI({
        apiKey: process.env.MISTRAL_API_KEY,
        model: 'open-mistral-7b',
    });
    try {
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            ['system', 'You are a helpful assistant.'],
            ['user', folderPromptContent],
        ]);
        const chain = prompt.pipe(model);
        const response = await chain.invoke({});
        const assignments = JSON.parse(response.content).data;
        const invalidCategories = categories.filter((category) => category.split(/\s+/).length > 1);
        if (invalidCategories.length > 0) {
            throw new Error(`Invalid categories found: ${invalidCategories.join(', ')}. Categories must contain only one word.`);
        }
        return assignments;
    }
    catch (error) {
        throw error;
    }
};
exports.organizeFilesAnalysis = organizeFilesAnalysis;
//# sourceMappingURL=openai-setup.js.map