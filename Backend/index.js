import "dotenv/config";

import express from "express";
import cors from "cors";
import mainroutes from "./routes/mainrouter.js";
import aimainroute from "./Airoutes/AimainRoute.js";
import "./db.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/v1", mainroutes);
app.use("/api/v1", aimainroute);

const PORT = process.env.PORT || 3400;

app.listen(PORT, () => {
  console.log("Server is Live on " + PORT);
});