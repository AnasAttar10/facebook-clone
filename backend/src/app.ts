import express, { NextFunction, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import reactionRoutes from "./routes/reactionRoutes";
import authRoutes from "./routes/authRoutes";
import ApiError from "./utils/ApiError";
import globalError from "./middlewares/errors/errorMidleware";
const app = express();
// Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  console.log("production mode ");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "node_modules")));

// Routes

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/reactions", reactionRoutes);
app.use("/auth", authRoutes);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Can't found this route ${req.originalUrl}`, 400));
});
// Global error handling midleware (to Express errors )
app.use(globalError);

export default app;
