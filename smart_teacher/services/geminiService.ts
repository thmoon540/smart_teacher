import { GoogleGenAI } from "@google/genai";

// Note: This service now uses an environment variable for the API key.
// You must set API_KEY in your deployment environment (e.g., Netlify).
const apiKey = process.env.API_KEY;

export const runGemini = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "حدث خطأ في إعدادات التطبيق: مفتاح API غير موجود. يرجى التأكد من إضافته في بيئة النشر.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API key is invalid'))) {
        return 'حدث خطأ: مفتاح API المستخدم في إعدادات التطبيق غير صالح.';
    }
    if (error instanceof Error) {
        return `حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.`;
    }
    return "حدث خطأ غير معروف أثناء الاتصال بالذكاء الاصطناعي.";
  }
};