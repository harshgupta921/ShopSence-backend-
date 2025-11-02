import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";

dotenv.config({ path: "./.env" });

// Connect DB
connectDB()
  
export default app;
