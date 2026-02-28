import express from "express"
const routes = express.Router();
import Zod, { email } from "zod"
import User from "../db.js";
import JWT from "jsonwebtoken";

{/* This is for the Sign-UP */}

const SignUPbody = Zod.object({
    name: Zod.string(),
    email: Zod.string().email(),
    password: Zod.string()
})

routes.post("/signup", async (req, res)=>{
    const {name, email, password} = req.body
    const {success} = SignUPbody.safeParse(req.body)
    
    try {
        if(!success) {
            return res.status(404).json({ msg: "Invalid Creadential" })
        }
        
        const exsistingUser = await User.findOne({
            email
        })

        if(exsistingUser) {
            res.status(401).json({
                msg: "User Already Exists!"
            })
        }

        // bd user
        const Users = await User.create({
            name,
            email,
            password
        })


        const UserId = Users._id

        const token = JWT.sign({
            UserId
        }, process.env.JWT_SECRET)

        res.status(200).json({
            msg: "USer Created! ",
            token: token
        })
    } 
    catch (error) {
        console.error(error.message);
    }
})


{/* This is for the Signin */}


const SignInbody = Zod.object({
    email: Zod.string().email(),
    password: Zod.string()
})

routes.post('/signin', async(req, res)=>{
    const {email, password} = req.body
    const Checks = SignInbody.safeParse(req.body)
    
    try {
        if(!Checks.success){
            return res.status(404).json({
                msg: "Input is Invalid!"
            })
        }

        const users = await User.findOne({
            email,
            password
        })   

        if(!users){
            return res.status(401).json({
                msg: "Invalid email or password!"
            })
        }

        const token = JWT.sign({
            userId: users._id
        },process.env.JWT_SECRET)
        
        res.status(200).json({
            token: token
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            msg: "Server error"
        })
    }
})

export default routes;