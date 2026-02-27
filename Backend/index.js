import express from "express"
import dotenv from "dotenv";
import cores from "cors"
import mainroutes from "./routes/mainrouter.js"

const app = express();

dotenv.config()

app.use(cores());

app.use(express.json());

app.use('/api/v1', mainroutes);

const PORT = process.env.PORT || 3400

app.listen(PORT , console.log("Server is Live on " + PORT));