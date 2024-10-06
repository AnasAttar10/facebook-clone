import express from "express";
import {
  addReaction,
  getAllReactions,
  getAllReactionsByPostId,
} from "../controllers/reactionController";

const route = express.Router();

route.get("/", getAllReactions);
route.get("/:postId", getAllReactionsByPostId);
route.post("/", addReaction);
export default route;
