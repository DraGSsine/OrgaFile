import { ChatPromptTemplate } from "@langchain/core/prompts";

export const CHUNK_SIZE = 2000;
export const CHUNK_OVERLAP = 50;
export const MAX_CHUNKS = 15;
export const MAX_CONTEXT_LENGTH = 2000;
export const SUPPORTED_IMAGES = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
// export const PREDEFINED_CATEGORIES = [
//   "Technology",
//   "Business",
//   "Science",
//   "Health",
//   "Education",
//   "Entertainment",
//   "Sports",
//   "Politics",
//   "News",
//   "Finance",
//   "Travel",
//   "Food",
//   "Fashion",
//   "Music",
//   "Art",
//   "Lifestyle",
//   "Gaming",
//   "Photography",
//   "Literature",
//   "History",
//   "Environment",
//   "Culture",
//   "Social Media",
//   "Marketing",
//   "Design",
//   "Programming",
//   "Legal",
// ] as const;


export const PREDEFINED_CATEGORIES = {
  Entertainment: {
    includes: [
      "Movies and TV shows",
      "Streaming content",
      "Memes and funny content",
      "Comics and animation",
      "Celebrity news and gossip",
      "Entertainment news",
      "Movie trailers",
      "TV series episodes",
      "Comedy videos",
      "Fun and humorous content"
    ],
    fileTypes: ["videos", "images", "gifs", "memes"]
  },
  Gaming: {
    includes: [
      "Video game content",
      "Gaming streams",
      "Game tutorials",
      "Esports content",
      "Game reviews",
      "Gaming news",
      "Gaming highlights",
      "Gaming guides",
      "Game screenshots",
      "Gaming community content"
    ],
    fileTypes: ["videos", "images", "streams", "screenshots"]
  },
  Music: {
    includes: [
      "Songs and albums",
      "Music videos",
      "Concert recordings",
      "Artist content",
      "Playlists",
      "Music reviews",
      "Lyrics",
      "Musical performances",
      "Band content",
      "Music production"
    ],
    fileTypes: ["audio", "videos", "playlists", "lyrics"]
  },
  Education: {
    includes: [
      "Learning materials",
      "Online courses",
      "Academic papers",
      "Study guides",
      "Educational videos",
      "Research documents",
      "Tutorials",
      "Lecture notes",
      "Educational resources",
      "Academic content"
    ],
    fileTypes: ["documents", "pdfs", "presentations", "videos"]
  },
  Business: {
    includes: [
      "Business documents",
      "Resumes and CVs",
      "Presentations",
      "Reports",
      "Contracts",
      "Business plans",
      "Financial documents",
      "Corporate materials",
      "Professional documents",
      "Work-related content"
    ],
    fileTypes: ["documents", "spreadsheets", "pdfs", "presentations"]
  },
  Technology: {
    includes: [
      "Tech reviews",
      "Software guides",
      "Tech news",
      "Digital products",
      "App reviews",
      "Tech tutorials",
      "Gadget reviews",
      "Software updates",
      "Tech tips",
      "Digital tools"
    ],
    fileTypes: ["articles", "reviews", "tutorials", "software"]
  },
  Sports: {
    includes: [
      "Sports content",
      "Match highlights",
      "Team news",
      "Sports commentary",
      "Athletic events",
      "Tournament coverage",
      "Sports news",
      "Player profiles",
      "Game analysis",
      "Sports statistics"
    ],
    fileTypes: ["videos", "articles", "statistics", "highlights"]
  },
  Art: {
    includes: [
      "Digital artwork",
      "Paintings",
      "Illustrations",
      "Graphic designs",
      "Drawings",
      "Animations",
      "Visual art",
      "Creative works",
      "Artistic photos",
      "Art portfolios"
    ],
    fileTypes: ["images", "designs", "artwork", "animations"]
  },
  News: {
    includes: [
      "Current events",
      "News articles",
      "Journalism",
      "Breaking news",
      "World news",
      "Local news",
      "News reports",
      "News analysis",
      "Newsletters",
      "Press releases"
    ],
    fileTypes: ["articles", "news", "reports", "updates"]
  },
  Personal: {
    includes: [
      "Private documents",
      "Personal photos",
      "Identity documents",
      "Certificates",
      "Personal notes",
      "Journals",
      "Family content",
      "Personal records",
      "Private files",
      "Memories"
    ],
    fileTypes: ["documents", "photos", "notes", "personal files"]
  },
  Social: {
    includes: [
      "Social media content",
      "Community posts",
      "Group discussions",
      "Forum threads",
      "Social updates",
      "Profile content",
      "Social interactions",
      "Community discussions",
      "Social sharing",
      "Online communities"
    ],
    fileTypes: ["posts", "discussions", "social updates", "messages"]
  },
  Food: {
    includes: [
      "Recipes",
      "Cooking videos",
      "Food photos",
      "Restaurant reviews",
      "Culinary guides",
      "Meal plans",
      "Food blogs",
      "Cooking tutorials",
      "Food reviews",
      "Dining content"
    ],
    fileTypes: ["recipes", "videos", "photos", "reviews"]
  },
  Travel: {
    includes: [
      "Travel guides",
      "Destination photos",
      "Trip planning",
      "Travel reviews",
      "Adventure content",
      "Travel tips",
      "Tourism content",
      "Travel blogs",
      "Vacation planning",
      "Travel experiences"
    ],
    fileTypes: ["guides", "photos", "reviews", "itineraries"]
  },
  Shopping: {
    includes: [
      "Product reviews",
      "Shopping guides",
      "Deal lists",
      "Product catalogs",
      "Fashion items",
      "Shopping recommendations",
      "Product comparisons",
      "Online shopping",
      "Retail content",
      "Shopping deals"
    ],
    fileTypes: ["products", "reviews", "catalogs", "shopping lists"]
  },
  Fitness: {
    includes: [
      "Workout videos",
      "Exercise plans",
      "Health guides",
      "Nutrition content",
      "Wellness tips",
      "Yoga tutorials",
      "Fitness tracking",
      "Exercise routines",
      "Health tips",
      "Workout plans"
    ],
    fileTypes: ["videos", "guides", "plans", "tracking"]
  }
};


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
    ["system", "You are an expert at correcting typos in categories."],
    [
      "user",
      `Correct any typos in these categories:
    {categories}

    Return corrected categories as a comma-separated string.`,
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
      3. Predefined Categories: ${PREDEFINED_CATEGORIES}
          
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
      2. Predefined Categories: ${PREDEFINED_CATEGORIES}
          
      Assign the most appropriate category following the strict priority order.`,
    ],
  ]),
};
