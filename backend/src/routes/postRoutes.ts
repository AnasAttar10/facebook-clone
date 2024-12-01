import express from "express";
import {
  addNewPost,
  deletePost,
  getAllPosts,
  getPost,
  setPostIdToBody,
  setUserParamToBody,
  updatePost,
} from "../controllers/postController";
import {
  addNewPostValidator, // there are error in this stage .
  getPostValidator,
  updatePostValidator,
  removePostValidator,
} from "../validator/postValidator";
import commentRoute from "./commentRoutes";
import reactionRoute from "./reactionRoutes";

import { deleteComments } from "../controllers/commentController";
import {
  uploadMultipleImages,
  uploadMultipleToCloudinary,
} from "../middlewares/multer/multer";
import { deleteReactions } from "../controllers/reactionController";

const route = express.Router({ mergeParams: true });

// need outside params
route.use("/:postId/comments", commentRoute);
route.use("/:postId/reactions", reactionRoute);

// routes
route.get("/", getAllPosts);
route.get("/:id", getPostValidator, getPost);
route.post(
  "/",
  uploadMultipleImages,
  setUserParamToBody,
  addNewPostValidator,
  uploadMultipleToCloudinary,
  addNewPost
);
route.put(
  "/:id",
  uploadMultipleImages,
  updatePostValidator,
  uploadMultipleToCloudinary,
  updatePost
);
route.delete(
  "/:id",
  setPostIdToBody,
  removePostValidator,
  deleteComments,
  deleteReactions,
  deletePost
);
export default route;
