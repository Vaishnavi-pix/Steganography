// Remove dotenv config since GCP injects environment variables natively
const genai = require("@google/genai");

// GCP uses process.env.GEMINI_API_KEY or whatever you name it in the GCP Console.
// It's recommended to avoid lowercase names like 'apiKey' for system env variables.
const apiKey = process.env.GEMINI_API_KEY || process.env.apiKey;

if (!apiKey) {
  console.warn("Warning: Gemini API Key is missing from the environment variables!");
}

const ai = new genai.GoogleGenAI({ apiKey: apiKey });

const promptTemplate = "Craft a concise and imaginative text, that seamlessly integrates the following word group. Word Group: ";

async function genText(words) {
  // Use a clean, template-literal approach for the final prompt
  const prompt = `${promptTemplate}${words}. Each word must be used only once, in the exact same order, and use no other prepositions.`;
  
  console.log("Prompting Gemini:", prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "";
    // Clean markdown bolding characters
    const ret = responseText.replace(/\*\*/g, '');

    console.log("Gemini Cleaned Response:", ret);
    return ret;

  } catch (error) {
    console.error("Error calling Gemini API inside GCP Function:", error);
    throw error; // Throw the error so your main Express app can handle it with a 500 status
  }
}

// Keep your export matching your current app setup
exports.genText = genText;