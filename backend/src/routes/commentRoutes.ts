import express from "express";
import {
  getAllComments,
  getAllCommentsByPostId,
  addComment,
  removeComment,
} from "../controllers/commentController";

const route = express.Router();
route.get("/", getAllComments);
route.post("/", addComment);
route.get("/:postId", getAllCommentsByPostId);
route.delete("/:commentId", removeComment);
export default route;
