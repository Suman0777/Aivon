import express from "express";
import "dotenv/config";
import { KokoroTTS } from "kokoro-js";
import { auth } from "../auth.js";
import wav from "wav";
import { PassThrough } from "stream";

const routes = express.Router();

let tts = null;

const loadModel = async () => {
  try {
    tts = await KokoroTTS.from_pretrained(
      "onnx-community/Kokoro-82M-ONNX",
      { dtype: "fp16" }
    );
    console.log("Kokoro model loaded");
  } catch (err) {
    console.error(" Model load error:", err);
  }
};

// call it once
loadModel();

routes.post("/generate-voice", auth, async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    if (!tts) {
      return res.status(503).json({ message: "Model loading, try again..." });
    }

    const result = await tts.generate(prompt, {
      voice: "am_michael",
    });


    const audioData = result.audio;          
    const sampleRate = result.sample_rate;   

    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    const stream = new PassThrough();


    const int16Buffer = new Int16Array(audioData.length);

    for (let i = 0; i < audioData.length; i++) {
      int16Buffer[i] = Math.max(-1, Math.min(1, audioData[i])) * 32767;
    }

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
    res.status(500).json({
      message: "Failed to generate voice clip",
    });
  }
});

export default routes;