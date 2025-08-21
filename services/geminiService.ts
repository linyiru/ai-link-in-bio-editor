
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const isAiAvailable = !!ai;

export const generateBio = async (keywords: string): Promise<string> => {
  if (!ai) {
    return Promise.resolve("AI features are disabled. Please configure your API_KEY.");
  }

  try {
    const prompt = `Generate a short, engaging, and professional bio (max 160 characters) for a 'link-in-bio' page. The bio should be based on these keywords: "${keywords}". The tone should be friendly yet professional. Do not use hashtags.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            maxOutputTokens: 50,
            temperature: 0.7,
        }
    });

    return response.text.trim().replace(/^"|"$/g, ''); // Remove quotes if AI adds them
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Failed to generate bio. Please try again.";
  }
};
