import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Proxy endpoint: Client sends prompt to /api/gemini, server holds the secret GEMINI_API_KEY
  app.post('/api/gemini', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Nội dung câu hỏi (prompt) không được để trống' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'Chưa cấu hình GEMINI_API_KEY trong biến môi trường (Environment Variable) trên server.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            systemInstruction ||
            'Bạn là gia sư AI ôn tập học tập dành cho học sinh K12. Trả lời thân thiện, ngắn gọn, giải thích tư duy từng bước logic và chỉ ra bẫy lỗi sai cần tránh.',
        },
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error('Lỗi Gemini Serverless Proxy:', err);
      return res.status(500).json({
        error: err.message || 'Lỗi máy chủ proxy khi gọi Google Gemini API',
      });
    }
  });

  // Mount Vite middleware in development or serve static in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serverless Proxy backend & Vite running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
