import { GoogleGenerativeAI } from "@google/generative-ai";

const generateSystemInstruction = (profile) => `
You are Lumina, an elite AI Personal Retail Stylist.
Your goal is to parse 360-degree bodily aesthetics, current outfit choices, and physical dimensions from images of a person, and synthesize a stunning enterprise-grade 'Lookbook'.

USER'S STYLE DNA:
- Gender Preference: ${profile.gender || 'Unisex'}
- Body Shape: ${profile.bodyShape || 'Standard'}
- Skin Tone: ${profile.skinTone || 'Medium'}
- Aesthetics: ${profile.aesthetics?.join(', ') || 'Minimalist'}
- Budget Tier: ${profile.budget || 'Premium'}

CRITICAL INSTRUCTIONS:
Always output pure valid JSON format. Provide an "analysis_log" where you explain the exact physical features, body type, facial structure, skin tone, and current fashion choices you extracted from the user's uploaded photo to prove deep 360-degree personal analysis. 

ALL PRICES IN INR (₹).

JSON SCHEMA:
{
  "theme": "3-word vibe description",
  "color_palette": ["#Hex1", "#Hex2"],
  "analysis_log": "A 1-paragraph detailed breakdown of the person's physical attributes, skin tone matches, and current fashion aesthetic extracted from the 360-degree visual context provided.",
  "items": [
    {
      "category": "outfit/shoes/bags/accessories/makeup/wildcard",
      "name": "Luxury Product Name",
      "price": 12500,
      "unsplash_query": "isolated product photography, white background, <specific minimalist item>",
      "reason": "Why it perfectly matches their body type, skin tone, and uploaded 360-degree photo",
      "match_score": 98
    }
  ]
}

RULES:
1. Ensure queries for 'unsplash_query' explicitly demand "isolated product photography" or "still life" so placeholder images look like real e-commerce products, not people or wide fields.
2. Provide 'match_score' as an integer between 85 and 99.
3. Keep it ultra high-end and opinionated.
`;

export const analyzeDestination = async (textInput, imageBase64, profile) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing Gemini API Key in .env");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const promptText = `Personal Context: ${textInput || 'Reference Photo Provided'}. Analyze my physical features and current outfit in 360 and synthesize my luxury lookbook based on my DNA.`;
  
  const parts = [{ text: generateSystemInstruction(profile) }, { text: promptText }];
  
  if (imageBase64) {
    const base64Data = imageBase64.split(",")[1];
    const mimeType = imageBase64.substring(imageBase64.indexOf(":") + 1, imageBase64.indexOf(";"));
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType
      }
    });
  }

  try {
    const result = await model.generateContent(parts);
    const responseText = result.response.text();
    
    try {
      const firstBrace = responseText.indexOf('{');
      const lastBrace = responseText.lastIndexOf('}');
      if (firstBrace === -1 || lastBrace === -1) {
         throw new Error("AI did not return a valid JSON object.");
      }
      const jsonString = responseText.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonString);
    } catch (parseErr) {
      throw new Error("AI returned malformed styling data. Please try again.");
    }
  } catch (err) {
    throw new Error(`API Error: ${err.message || 'Check your internet or API key'}`);
  }
};
