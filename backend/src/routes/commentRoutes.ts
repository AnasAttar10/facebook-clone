import express from "express";
import {
  addComment,
  getAllComments,
  getComment,
  deleteComment,
  updateComment,
  setPostParamToBody,
} from "../controllers/commentController";
import {
  addCommentValidator,
  getCommentValidator,
  updateCommentValidator,
  removeCommentValidator,
} from "../validator/commentValidator";
import { setUserParamToBody } from "../controllers/postController";
import { protectRoutes } from "../controllers/authController";

const route = express.Router({ mergeParams: true });

route.get("/", getAllComments);
route.get("/:id", getCommentValidator, getComment);
route.post(
  "/",
  protectRoutes,
  setUserParamToBody,
  setPostParamToBody,
  addCommentValidator,
  addComment
);
route.put("/:id", updateCommentValidator, updateComment);
route.delete("/:id", removeCommentValidator, deleteComment);

export default route;
