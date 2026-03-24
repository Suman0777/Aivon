import express from "express";
import { z } from "zod";
import { InferenceClient } from "@huggingface/inference";
import "dotenv/config";

const routes = express.Router();

/* Updated Schema: Validating an array of messages */
const chatSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().min(1, "Message content is required")
        })
    ).min(1, "At least one message is required"),
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

        const { messages } = parsed.data;

        // Aivon's core identity and instructions
        const systemPrompts = [
            {
                role: "system",
                content: "You are an AI named Aivon.",
            },
            {
                role: "system",
                content: "You are an AI which can perform tasks based on text to text conversation.",
            },
            {
                role: "system",
                content: "Your features are text generation only."
            },
            {
                role: "system",
                content: "And if someone asks you for image or voice generation, tell them to use the side bar for that."
            }
        ];

        // Merge system instructions with the user's ongoing chat history
        const fullConversation = [...systemPrompts, ...messages];

        const response = await client.chatCompletion({
            model: "Qwen/Qwen2.5-7B-Instruct",
            messages: fullConversation,
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