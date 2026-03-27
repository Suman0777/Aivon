import express from "express";
import "dotenv/config";
import axios from "axios";

const routes = express.Router();

// Checking the rote is running properly or not 
routes.get("/check", (req, res) => {
  try {
    return res.status(200).send("The server is running ok");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server check failed");
  }
});

//Route to generate image 
routes.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ msg: "prompt is required" });
    }

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", 
      }
    );

    console.log("IMAGE GENERATED");

    const base64Image = Buffer.from(response.data).toString("base64");

    res.json({
      imageUrl: `data:image/png;base64,${base64Image}`,
    });

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);

    res.status(500).json({
      msg:
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Image generation failed",
    });
  }
});

export default routes;