
import { GoogleGenAI, Type } from "@google/genai";
import { MenuAnalysis } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI {
    if (this.ai) return this.ai;
    
    // Safely check for process.env. In static hosts, process may be undefined.
    let apiKey = '';
    try {
      apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY || '' : '';
    } catch (e) {
      console.warn("Could not access process.env.API_KEY");
    }

    if (!apiKey) {
      console.error("API Key is missing. Gemini AI features will be unavailable.");
    }
    
    this.ai = new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });
    return this.ai;
  }

  async analyzeMenuPage(base64Image: string): Promise<MenuAnalysis> {
    const client = this.getClient();
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1],
            },
          },
          { text: "Scan this entire menu page and extract all dishes and information." }
        ],
      },
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            restaurantName: { type: Type.STRING },
            summary: { type: Type.STRING },
            dishes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  price: { type: Type.STRING },
                  calories: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                  allergens: { type: Type.ARRAY, items: { type: Type.STRING } },
                  pairing: { type: Type.STRING }
                },
                required: ["id", "name", "description", "price"]
              }
            }
          },
          required: ["restaurantName", "dishes"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Could not analyze menu");
    return JSON.parse(text) as MenuAnalysis;
  }
}

export const geminiService = new GeminiService();
