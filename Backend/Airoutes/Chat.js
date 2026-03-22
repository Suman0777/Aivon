import express from "express";
import { z } from "zod";
import { InferenceClient } from "@huggingface/inference";
import "dotenv/config";

const routes = express.Router();

/* Text Schema */
const chatSchema = z.object({
    message: z.string().min(1, "Message is required"),
});

/* Hugging Face Client */
const client = new InferenceClient(process.env.HF_TOKEN);

routes.get("/aihelp", (req, res) => {
    res.send("hi there");
});

routes.post("/chat", async (req, res) => {
    try {
        const parsed = chatSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid request body",
                details: parsed.error.issues,
            });
        }

        const { message } = parsed.data;

        const response = await client.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: [
                {
                    role: "system",
                    content: "You are an AI named Avion.",
                },
                {
                    role: "system",
                    content: "You are an AI which can perform task based on text to text conversation.",
                },
                {
                    role: "system",
                    content: "you feature are text generation only"
                },
                {
                    role: "system",
                    content: "And if someone ask you for image or voice generation tell them to just the side bar for that"
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        const reply = response.choices[0].message.content;

        return res.status(200).json({
            reply,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to process chat request",
            msg: error.message
        });
    }
});

export default routes;