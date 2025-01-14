import { ChatPromptTemplate } from "@langchain/core/prompts";

export const CHUNK_SIZE = 2000;
export const CHUNK_OVERLAP = 50;
export const MAX_CHUNKS = 15;
export const MAX_CONTEXT_LENGTH = 2000;
export const SUPPORTED_IMAGES = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
export const SUPPORTED_DOCUMENTS = [
  "pdf",
  "txt",
  "xlsx",
  "xls",
  "csv",
  "doc",
  "docx",
];

export const PREDEFINED_CATEGORIES = [
  "Business", // Business documents, reports, plans
  "Financial", // Money, investments, budgets
  "Legal", // Laws, contracts, regulations
  "Technical", // Technical specs, manuals, guides
  "Academic", // Research, studies, papers
  "Medical", // Health records, prescriptions
  "Personal", // Private documents and photos
  "Professional", // Career, work-related items
  "Educational", // Learning materials, courses
  "Creative", // Designs, artwork, graphics
  "Social", // Community, events, groups
  "Government", // Official documents, permits
  "Scientific", // Scientific data and research
  "Commercial", // Sales, products, services
  "Industrial", // Manufacturing, operations
  "Residential", // Housing, property documents
  "Reference", // Guides, documentation
  "Entertainment", // Media, movies, music, games
] as const;

const EXAMPLE_CATEGORIES = `
  Entertainment:
  - Game guides/screenshots → "Entertainment"
  - Movie collections → "Entertainment"
  - Music sheets → "Entertainment"
  
  Business:
  - Marketing plans → "Business"
  - Sales reports → "Business"
  - Company brochures → "Business"
  
  Financial:
  - Bank statements → "Financial"
  - Budget spreadsheets → "Financial"
  - Invoice templates → "Financial"
  
  Education:
  - Research papers → "Academic"
  - Study materials → "Academic"
  
  Personal:
  - Family photos → "Personal"
  - Health records → "Personal"
  - Hobby projects → "Personal"
  `;

export const PROMPT_TEMPLATES = {
  analysis: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a document analysis expert. Extract key information for categorization.
        Respond with valid JSON matching this schema:
        {{
          "mainTopic": "string (1-2 words describing primary subject)",
          "documentType": "string (invoice, image, receipt, report, etc.)",
          "keyEntities": ["string (key topics or entities)"],
          "summary": "string (1-2 sentence summary focusing on content purpose)"
        }}`,
    ],
    ["user", "Analyze this file: {context}"],
  ]),

  categorizationGeneral: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a file organization expert. Assign files to broad, general categories.
  
      Key Rules:
      1. Choose the most general category that fits
      2. Think about how related items group together
      3. Focus on the file's main purpose or content
      
      Common Examples by Category:
      ${EXAMPLE_CATEGORIES}
      
      Professional:
      - Resumes → "Professional"
        - Work portfolios → "Professional"
        - Certificates → "Professional"
        
        Technology:
        - Software documentation → "Technology"
        - System diagrams → "Technology"
        - Technical specs → "Technology"
        
        Legal:
        - Contracts → "Legal"
        - Licenses → "Legal"
        - Legal forms → "Legal"
        
        Creative:
        - Artwork → "Creative"
        - Design files → "Creative"
        - Photo collections → "Creative"
        
        Social:
        - Event photos → "Social"
        - Community documents → "Social"
        - Group materials → "Social"
        
        Educational:
        - Course materials → "Educational"
        - Training documents → "Educational"
        - Tutorial guides → "Educational"
        
        Archive:
        - Old versions → "Archive"
        - Past projects → "Archive"
        - Historical records → "Archive"
        
        Content analysis:
        - Main Topic: {mainTopic}
      - Document Type: {documentType}
      - Summary: {summary}
        
      Return ONLY the category name.`,
    ],
    [
      "user",
      `Available categories:
        ${PREDEFINED_CATEGORIES.join(", ")}
        
        Choose ONE general category that best fits.`,
    ],
  ]),

  categorizationCustom: ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a file organization expert. Follow this strict priority order:
  
        1. CUSTOM CATEGORIES (HIGHEST)
           - Always use matching custom categories first
           - Custom categories allow for specific organization
           - Example: "Action Games" instead of just "Entertainment"
  
        2. PREDEFINED CATEGORIES (FALLBACK)
           - Use when no custom category fits
           - Keep it general and intuitive
           - Example: Use "Entertainment" for all game-related files if no specific custom category exists
        
        Common Examples by Category:
        ${EXAMPLE_CATEGORIES}

        Content analysis:
        - Main Topic: {mainTopic}
        - Document Type: {documentType}
        - Summary: {summary}
  
        Return ONLY the category name.`,
    ],
    [
      "user",
      `Available categories in priority order:
        1. Custom Categories: {customCategories}
        2. Predefined Categories: ${PREDEFINED_CATEGORIES.join(", ")}
        
        Choose ONE category, preferring custom categories when available.`,
    ],
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
};
