import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";

dotenv.config({ path: "./.env" });

// Connect DB
connectDB()
  .then(() => {
    // Only listen locally, not on Vercel
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () =>
        console.log(`✅ Server running on http://localhost:${PORT}`)
      );
    }
  })
  .catch((err) => console.error("❌ MONGO DB connection failed: ", err));

// 👇 Export app (for Vercel)
export default app;
