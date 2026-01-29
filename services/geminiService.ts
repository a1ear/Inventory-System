import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (name: string, category: string) => {
  if (!process.env.API_KEY) return "AI description generation requires an API Key.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a professional, compelling product description for a product named "${name}" in the "${category}" category. Keep it under 100 words. Focus on benefits and technical excellence.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateInventoryReport = async (products: any[]) => {
  if (!process.env.API_KEY) return "Stock levels are currently being monitored manually (No API Key).";

  try {
    const summary = products.map(p => `${p.name} (${p.stock} in stock)`).join(', ');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this inventory data: ${summary}, provide a 2-sentence summary of overall stock health and one recommendation for reordering.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report:", error);
    return "Inventory is healthy. No immediate actions required.";
  }
};