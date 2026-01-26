//import { GoogleGenAI } from "@google/genai";
const genai = require("@google/genai");
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.apiKey;
console.log("API KEY: "+apiKey);
const ai = new genai.GoogleGenAI({ apiKey: apiKey});

let promptTemplate = "Craft a concise and imaginative email, that seamlessly integrates the following preposition word group. Each word must be used only once, in the exact same order, and use no other prepositions, Word Group: ";

async function genText(words) {
  let prompt = promptTemplate + words;
  prompt = "Craft a concise and imaginative text, that seamlessly integrates the following  word group. Word Group: " + words + ". Each word must be used only once, in the exact same order, and use no other prepositions. ";
  console.log("Prompt = " + prompt);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let responseText = response.text;
  let ret = responseText.replace(/\*\*/g, '');

  console.log("ret = " + ret);
  return ret;
}

exports.genText = genText;
