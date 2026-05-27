import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";

import authController from "./controllers/authController.js";
import eventController from "./controllers/eventController.js";
import registrationController from "./controllers/registrationController.js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authController);
app.use("/events", eventController);
app.use("/registrations", registrationController);

app.listen(3000, () => {console.log("Server running on port 3000")});
