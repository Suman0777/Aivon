import express from "express"
import Ai from "./Chat.js"
const routes = express.Router();

routes.use('/ai', Ai);
export default routes;