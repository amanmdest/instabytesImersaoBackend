import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generateDescription(imageBuffer) {
  const prompt =
    "Describe whats on the following picture";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text not available.";
  } catch (erro) {
    console.error("Error on geting alt-text:", erro.message, erro);
    throw new Error("Error on getting Gemini alt-text .");
  }
}