import { ChatPromptTemplate } from "@langchain/core/prompts";

export const CHUNK_SIZE = 2000;
export const CHUNK_OVERLAP = 50;
export const MAX_CHUNKS = 15;
export const MAX_CONTEXT_LENGTH = 2000;
export const SUPPORTED_IMAGES = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
export const PREDEFINED_CATEGORIES = [
  "Technology",
  "Business",
  "Science",
  "Health",
  "Education",
  "Entertainment",
  "Sports",
  "Politics",
  "News",
  "Finance",
  "Travel",
  "Food",
  "Fashion",
  "Music",
  "Art",
  "Lifestyle",
  "Gaming",
  "Photography",
  "Literature",
  "History",
  "Environment",
  "Culture",
  "Social Media",
  "Marketing",
  "Design",
  "Programming",
  "Legal",
] as const;

export const PROMPT_TEMPLATES = {
  analysis: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a document analysis expert. Always respond with valid JSON matching this exact schema:
    {{
      "mainTopic": "string (2-3 words)",
      "documentType": "string",
      "keyEntities": ["string"],
      "summary": "string"
    }}`,
    ],
    ["user", "Analyze this document:{context}"],
  ]),

  filename: ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an expert at generating concise, descriptive filenames.",
    ],
    [
      "user",
      `Generate a descriptive filename based on:
    Main Topic: {mainTopic}
    Document Type: {documentType}
    Summary: {summary}

    Rules:
    - Use 1-4 words
    - Only alphanumeric and hyphens
    - No file extensions
    - Focus on most distinctive aspect

    Return filename only.`,
    ],
  ]),
  typoCorrection: ChatPromptTemplate.fromMessages([
    ["system", "You are an expert in correcting typos in category names."],
    [
      "user",
      `
      You are a typo correction expert. Follow these strict rules:
      1. Correct all typos in the provided category names.  
      2. Return only the corrected category names without any special characters.  
      3. Capitalize the first letter of each category, with the remaining letters in lowercase.  
      4. Separate multi-word categories with spaces.  
      5. If a category has more than three words, shorten it to be clear and concise.  
  
      Correct the following categories:  
      {categories}  
  
      Return the corrected categories as a comma-separated string.`,
    ],
  ]),
  analysisImage: ChatPromptTemplate.fromMessages([
    ["system", "You are a document analysis expert specializing in images."],
    [
      "user",
      "Analyze this image and provide valid JSON with mainTopic, documentType, keyEntities, and summary.",
    ],
    ["human", [{ type: "image_url", image_url: "{context}" }]],
  ]),
  categorizationCustom: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a precise categorization expert. Follow this strict prioritization:

      PRIORITY ORDER (MUST be followed exactly):
      1. CUSTOM CATEGORIES (HIGHEST)
         - Check if content EXACTLY matches any custom category
         - Must be a precise match to use custom category
         - Reject if match is uncertain

      2. EXISTING CATEGORIES (MEDIUM)
         - Only check if no custom category match
         - Must clearly fit the existing category
         - No partial or uncertain matches

      3. PREDEFINED CATEGORIES (LOW)
         - Only check if no existing category match
         - Must clearly fit the predefined category
         - Use the most specific predefined category

      4. NEW CATEGORY (LAST RESORT)
         - Only if no other categories match
         - Must follow predefined category style
         - Must be general purpose
         - Limited to 1-2 words

      Analyze the content using:
      - Main Topic: {mainTopic}
      - Document Type: {documentType}
      - Summary: {summary}

      Return ONLY the final category name with no explanation.`,
    ],
    [
      "user",
      `Available categories in priority order:
      1. Custom Categories: {customCategories}
      2. Existing Categories: {existingCategories}
      3. Predefined Categories: ${PREDEFINED_CATEGORIES.join(", ")}
          
      Assign the most appropriate category following the strict priority order.`,
    ],
  ]),

  categorizationGeneral: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a precise categorization expert. Follow this strict prioritization:

      PRIORITY ORDER (MUST be followed exactly):
      1. EXISTING CATEGORIES (HIGHEST)
         - Check if content EXACTLY matches any existing category
         - Must be a precise match to use existing category
         - Reject if match is uncertain

      2. PREDEFINED CATEGORIES (MEDIUM)
         - Only check if no existing category match
         - Must clearly fit the predefined category
         - Use the most specific predefined category

      3. NEW CATEGORY (LAST RESORT)
         - Only if no other categories match
         - Must follow predefined category style
         - Must be general purpose
         - Limited to 1-2 words

      Analyze the content using:
      - Main Topic: {mainTopic}
      - Document Type: {documentType}
      - Summary: {summary}

      Return ONLY the final category name with no explanation.`,
    ],
    [
      "user",
      `Available categories in priority order:
      1. Existing Categories: {existingCategories}
      2. Predefined Categories: ${PREDEFINED_CATEGORIES.join(", ")}
          
      Assign the most appropriate category following the strict priority order.`,
    ],
  ]),
};
