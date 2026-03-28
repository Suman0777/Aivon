import express from "express";
import "dotenv/config";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";

const routes = express.Router();

import { exec } from "child_process";
import multer from "multer";
import fs from "fs";
import path from "path";

const upload = multer({
    storage: multer.memoryStorage()
});

routes.post('/remove-bg', upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file" });
        }

        const inputPath = `temp_${Date.now()}.png`;
        const outputPath = `output_${Date.now()}.png`;

        // Save file
        fs.writeFileSync(inputPath, req.file.buffer);

        // Run Python script
        exec(`python remove_bg.py ${inputPath} ${outputPath}`, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error processing image");
            }

            const image = fs.readFileSync(outputPath);
            const base64 = image.toString("base64");

            // cleanup
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);

            res.json({
                imageUrl: `data:image/png;base64,${base64}`
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error" });
    }
});

export default routes