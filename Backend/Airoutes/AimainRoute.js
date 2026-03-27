import express from "express"
import Ai from "./Chat.js"

import imageGeneration from "./ImageGeneration.js"
const routes = express.Router();

routes.use('/ai', Ai);
routes.use('/images', imageGeneration);

export default routes;