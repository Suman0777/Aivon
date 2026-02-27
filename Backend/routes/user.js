import express from "express"
const routes = express.Router();

routes.get("/Signup", (req, res)=>{
    res.send("Hi there ")
})

export default routes;