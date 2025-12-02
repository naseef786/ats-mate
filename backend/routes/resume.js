import { Router } from 'express';
import { PDFParse } from "pdf-parse";
import dotenv from 'dotenv';
dotenv.config();
const router = Router();
import multer from 'multer';
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { readFileSync } from "fs";
import { GoogleGenAI, Type } from '@google/genai';
import { json } from 'stream/consumers';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not defined.");
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const upload = multer({ dest: 'uploads/' });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Short summary of the candidate's professional background and experience."
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of key strengths and impressive qualifications."
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of weaknesses, gaps, or missing sections in the resume."
    },
    suggestedKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of suggested industry keywords for job search optimization."
    },
    score: {
      type: Type.INTEGER,
      description: "A professional score between 0 and 100 based on the resume's quality and experience."
    },
  },
  required: ['summary', 'strengths', 'weaknesses', 'score'],
};
// Upload resume
router.post("/upload", protect, upload.single("resume"), async (req, res) => {
  try {
    // 1. Setup and File Check
    const user = await User.findById(req.user.id);
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }


    const pdfData = new PDFParse({ url: file.path });
    const resumeText = await pdfData.getText();

    // Log the entire result to inspect its structure
    console.log("PDF Parse Result Structure:", JSON.stringify(resumeText, null, 2));

    if (typeof resumeText.text !== 'string' || resumeText.text.length < 10) {
      // If it's not a string or too short (indicating an extraction failure)
      console.error("PDF Extraction Failed or Result is not a string!");
      console.error("Type of resumeText:", typeof resumeText.text);
      return res.status(500).json({ message: "Could not extract readable text from PDF. Check PDF format or parser." });
    }

    // 3. Construct Prompt
    const prompt = `
    You are an expert ATS analyzer AI. Analyze the following resume text.
    Return a JSON object that strictly adheres to the provided schema.
    The analysis must be professional, objective, and detailed based only on the provided text.

    Resume text:
    ${resumeText.text}
`;

    // 4. Gemini API Call with Structured Output
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash", // Good model for text analysis
      contents: prompt,
      config: {
        responseMimeType: "application/json", // Crucial for JSON output
        responseSchema: analysisSchema,      // Crucial for structure
      },
    });

    // 5. Process and Save Output
    // Since we forced JSON, we can trust result.text is a JSON string
    const output = result.text.trim(); // The output is a string

    // Note: The model is forced to return valid JSON, so the try/catch for parsing is less critical,
    // but still good practice to handle potential edge cases.
    let aiAnalysis = JSON.parse(output);


    const analysis = {
      wordCount: "Comiing Soon",
      aiAnalysis,
    };

    user.resumes.push({
      fileUrl: file.path,
      analysis,
    });
    await user.save();

    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis,
    });
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // You might want to delete the uploaded file in case of an error here
    res.status(500).json({ message: "Resume analysis failed", error: error.message });
  }
});

// Job description keyword check
router.post('/keywords', protect, async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const jdWords = jobDescription.toLowerCase().split(/\s+/);
  const missingKeywords = jdWords.filter(word => !resumeWords.includes(word));
  res.json({ missingKeywords });
});

export default router;
