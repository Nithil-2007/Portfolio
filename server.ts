import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Design Inspiration
  app.get("/api/inspire", async (req, res) => {
    const fallbackTips = [
      "White space is not empty space; it is a tool. Use it to give your designs room to breathe.",
      "Design is as much about what you leave out as what you put in. Simplify until you can't anymore.",
      "Contrast is the secret sauce. If everything is bold, nothing is bold. Pick your battles.",
      "Typography is the voice of your design. Choose a font that speaks the right language.",
      "God is in the details, but keep the big picture in sight. Align everything with purpose."
    ];

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "You are a world-class graphic design mentor. Provide a short (1-2 sentence) punchy design tip or bit of inspiration for a portfolio. Be bold and creative.",
        config: {
          systemInstruction: "You are Nithil Matthew's AI Design Assistant. Your tone is bold, minimalist, and professional.",
        },
      });
      res.json({ tip: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      
      // If it's a quota error (429), return a curated fallback tip instead of a 500
      if (error?.status === 429 || error?.message?.includes("quota") || error?.message?.includes("429")) {
        const randomTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
        return res.json({ 
          tip: randomTip, 
          isFallback: true,
          message: "Quota reached. Showing a curated tip." 
        });
      }
      
      res.status(500).json({ error: "Failed to get inspiration" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
