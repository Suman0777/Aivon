import express from "express";
import { KokoroTTS } from "kokoro-js";
import { auth } from "../auth.js";
import wav from "wav";
import { PassThrough } from "stream";

const routes = express.Router();

let tts = null;
let isLoading = false;

const getModel = async () => {
  if (tts) return tts;

  if (isLoading) {
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!isLoading) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
    return tts;
  }

  isLoading = true;
  try {
    console.log("Loading Kokoro TTS model...");
    tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-ONNX", {
      dtype: "fp16",
    });
    console.log("Kokoro model loaded.");
  } catch (err) {
    console.error("Model load error:", err);
    tts = null;
  } finally {
    isLoading = false;
  }

  return tts;
};

routes.post("/generate-voice", auth, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = await getModel();

    if (!model) {
      return res.status(503).json({ message: "TTS model failed to load. Please try again." });
    }

    const result = await model.generate(prompt, { voice: "am_michael" });

    const audioData = result.audio;

    const int16Buffer = new Int16Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      int16Buffer[i] = Math.max(-1, Math.min(1, audioData[i])) * 32767;
    }

    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    const stream = new PassThrough();
    stream.end(Buffer.from(int16Buffer.buffer));

    res.set({
      "Content-Type": "audio/wav",
      "Content-Disposition": "inline; filename=voice.wav",
      "x-usage-used": "1",
      "x-usage-limit": "5",
    });

    stream.pipe(writer).pipe(res);
  } catch (error) {
    console.error("TTS Error:", error);
    res.status(500).json({ message: "Failed to generate voice clip" });
  }
});

export default routes;