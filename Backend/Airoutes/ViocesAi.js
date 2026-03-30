import express from "express";
import "dotenv/config";
import axios from "axios";

const routes = express.Router();

routes.get("/testing", (req, res)=>{
    res.send("api is working properly!!")
})

routes.post("/generate-voice", (req, res)=>{
    const data = req.prompt
    
    console.log(data);
})

export default routes;
