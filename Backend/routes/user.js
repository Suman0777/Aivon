import express from "express"
const routes = express.Router();
import Zod from "zod"
import User from "../db.js";

const SignUPbody = Zod.object({
    name: Zod.string(),
    email: Zod.string().email(),
    password: Zod.string()
})

routes.post("/Signup", (req, res)=>{
    const {success} = SignUPbody.safeParse(req.body)
    
    try {
        if(!success) {
            return res.status(404).json({ msg: "Invalid Creadential" })
        }
        
    } catch (error) {
        console.error(error.message);
    }
})

export default routes;