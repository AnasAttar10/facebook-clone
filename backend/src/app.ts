import express from "express";
import path from "path";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import reactionRoutes from "./routes/reactionRoutes";
import { upload } from "./middlewares/multer/multer";
import {
  uploadMultiple,
  uploadSingle,
} from "./middlewares/upload/uploadMultiple";
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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "node_modules")));

// Routes
// app.post("/api/upload", upload.array("images", 10), uploadMultiple);
// app.post("/upload-profile-image", upload.single("image"), uploadSingle);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/reactions", reactionRoutes);

export default app;
