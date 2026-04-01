import express from "express"
import dotenv from "dotenv";
import cores from "cors"
import mainroutes from "./routes/mainrouter.js"
import aimainroute from "./Airoutes/AimainRoute.js"
import "./db.js"  // Initialize database connection

const app = express();

dotenv.config()

{/* For backend Connect with the rote */}

app.use(cores({
    origin: "*"
}));

{/* Body Pharser */}

app.use(express.json());

{/* For Version Control */}
app.use('/api/v1', mainroutes);

{/* rote  for the ai */}
app.use('/api/v1', aimainroute);
app.use('/app/v1', aimainroute);

{/* Port */}
const PORT = process.env.PORT || 3400

app.listen(PORT , console.log("Server is Live on " + PORT));