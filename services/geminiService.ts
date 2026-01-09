
import { GoogleGenAI, Type } from "@google/genai";
import { DishInfo } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async identifyDish(base64Image: string): Promise<DishInfo> {
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
          { text: "Identify the main dish centered in this menu view and provide detailed information." }
        ],
      },
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            price: { type: Type.STRING },
            calories: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            allergens: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            pairing: { type: Type.STRING }
          },
          required: ["id", "name", "description", "price", "ingredients"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Could not identify dish");
    return JSON.parse(text) as DishInfo;
  }
}

export const geminiService = new GeminiService();
