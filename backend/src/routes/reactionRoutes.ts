import express from "express";
import {
  addReaction,
  getAllReactions,
  getReaction,
  removeReaction,
  updateReaction,
} from "../controllers/reactionController";
import {
  addReactionValidator,
  getReactionValidator,
  removeReactionValidator,
  updateReactionValidator,
} from "../validator/reactionValidator";
import { setUserParamToBody } from "../controllers/postController";
import { setPostParamToBody } from "../controllers/commentController";

const route = express.Router({ mergeParams: true });

route.get("/", getAllReactions);
route.get("/:id", getReactionValidator, getReaction);
route.post(
  "/",
  setUserParamToBody,
  setPostParamToBody,
  addReactionValidator,
  addReaction
);
route.put("/:id", updateReactionValidator, updateReaction);
route.delete("/:id", removeReactionValidator, removeReaction);

export default route;
