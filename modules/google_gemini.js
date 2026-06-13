// Remove dotenv config since GCP injects environment variables natively
const genai = require("@google/genai");

// GCP uses process.env.GEMINI_API_KEY or whatever you name it in the GCP Console.
// It's recommended to avoid lowercase names like 'apiKey' for system env variables.
const apiKey = process.env.GEMINI_API_KEY || process.env.apiKey;

if (!apiKey) {
  console.warn("Warning: Gemini API Key is missing from the environment variables!");
}

const ai = new genai.GoogleGenAI({ apiKey: apiKey });

// Add coverType directly to the function parameter list
async function genText(words, coverType) {
  
    // Rephrased prompt to prioritize the coverType format
    const prompt = `You are a writer specializing in creating a ${coverType}. 

    Your task is to write exactly one ${coverType} that seamlessly integrates this specific word group: ${words}.
    
    CRITICAL RULES:
    1. Format: The entire output must strictly be a ${coverType}. Do not write an essay, introduction, or generic text.
    2. Word Order: Use each word from the group exactly once, in the precise order provided.
    3. Grammar Constraint: Aside from the prepositions already present in the provided word group, you are strictly forbidden from adding any prepositions in this list: (in,on,at,by,for,with,about,against,between,into,through,during,before,after,above,below) to the text.`;
  
  console.log("Prompting Gemini:", prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "";
    const ret = responseText.replace(/\*\*|\*/g, '');

    console.log("Gemini Cleaned Response:", ret);
    return ret;

  } catch (error) {
    console.error("Error calling Gemini API inside GCP Function:", error);
    throw error;
  }
}

exports.genText = genText;
