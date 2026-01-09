
import { GoogleGenAI, Type } from "@google/genai";
import { MenuAnalysis } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Using process.env.API_KEY directly as per SDK guidelines.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeMenuPage(base64Image: string): Promise<MenuAnalysis> {
    const response = await this.ai.models.generateContent({
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
