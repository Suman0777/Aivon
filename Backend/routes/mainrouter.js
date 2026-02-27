import express from "express"
import UserRouter from "./user.js"
const routes = express.Router();

routes.use('/user', UserRouter)
routes.get("/", (req, res)=>{
    res.send("TEsting")
})
export default routes;