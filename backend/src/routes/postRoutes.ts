import express from "express";
import {
  addNewPost,
  getAllPosts,
  getAllPostsByUserId,
  removePost,
} from "../controllers/postController";
import { upload } from "../middlewares/multer/multer";
const route = express.Router();
// routes
route.get("/", getAllPosts);
route.get("/:userId", getAllPostsByUserId);
route.post("/", upload.array("images", 10), addNewPost);
route.delete("/:postId", removePost);
export default route;
