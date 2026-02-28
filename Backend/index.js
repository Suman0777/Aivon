import express from "express"
import dotenv from "dotenv";
import cores from "cors"
import mainroutes from "./routes/mainrouter.js"

const app = express();

dotenv.config()

{/* For backend Connect with the rote */}

app.use(cores());

{/* Body Pharser */}

app.use(express.json());

{/* For Version Control */}
app.use('/api/v1', mainroutes);

{/* Port */}
const PORT = process.env.PORT || 3400

app.listen(PORT , console.log("Server is Live on " + PORT));