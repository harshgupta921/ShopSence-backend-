import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routers/user.routes.js";

const app = express();

// ✅ Proper CORS setup
app.use(
  cors({
    origin: [
      "https://shop-sence.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static(path.resolve("public")));

// ✅ Root route test
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is live 🚀" });
});

// ✅ User routes
app.use("/api/v1/users", userRouter);

// ✅ Error middleware
app.use(errorMiddleware);

export default app;
