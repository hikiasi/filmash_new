
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async chatWithExpert(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional luxury car consultant for Filmash. You help users choose between Lixiang, Zeekr, and other Chinese electric/hybrid cars. Speak in Russian. Be concise, expert, and helpful.",
      }
    });
    return response.text || "Извините, я не смог обработать ваш запрос.";
  }

  async generateDreamCar(prompt: string, size: "1K" | "2K" | "4K"): Promise<string | null> {
    // Requires a fresh instance as per key selection guidelines for Pro models
    const aiPro = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await aiPro.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: `High quality cinematic shot of: ${prompt}, photorealistic, 8k resolution, luxury aesthetic` }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }

  async textToSpeech(text: string): Promise<Uint8Array | null> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return this.decodeBase64(base64Audio);
    }
    return null;
  }

  private decodeBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

export const gemini = new GeminiService();
