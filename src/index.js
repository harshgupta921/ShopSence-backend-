import connectDB from "./db/index.js"
import dotenv from "dotenv"
import {httpServer} from "./app.js" 

dotenv.config({
    path : "./.env"
})


connectDB()
.then(httpServer.listen(process.env.PORT,()=>{
    console.log("MONGO connected and server is running... ",process.env.PORT);
    
}))
.catch((err)=> console.log("MONGO db connection failed !! ", err))


