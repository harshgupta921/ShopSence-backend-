import connectDB from "./db/index.js"
import dotenv from "dotenv"
import {httpServer} from "./app.js" // This part is correct

dotenv.config({
    path : "./.env"
})


connectDB()
.then(() => {
    console.log("MONGO connected successfully.");
})
.catch((err) => {
    console.error("MONGO db connection failed !! ", err);
})


export default httpServer;