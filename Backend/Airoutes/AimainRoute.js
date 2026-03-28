import express from "express"
import Ai from "./Chat.js"
import BgremoverRoute from "./BackgroundRemoverRoute.js"
import imageGeneration from "./ImageGeneration.js"
const routes = express.Router();

routes.use('/ai', Ai);
routes.use('/images', imageGeneration);
routes.use('/bgremover', BgremoverRoute);

export default routes;