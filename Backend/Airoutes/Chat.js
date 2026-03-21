import express from 'express';
import zod from "zod";
const routes = express.Router();

const chatSchema = zod.object({
    message: zod.string().min(1, "Message is required"),
});


routes.get('/aihelp', (req, res)=>{
    try {
        res.send("hi there")
    } catch (error) {
        console.error(error.message);
    }
})

routes.post('/chat', (req, res)=>{
    try {
        const parsed = chatSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid request body",
                details: parsed.error.issues,
            });
        }

        const { message } = parsed.data;
        console.log("Incoming chat message:", message);

        return res.status(200).json({
            reply: `You said: ${message}`,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Failed to process chat request" });
    }
})

export default routes