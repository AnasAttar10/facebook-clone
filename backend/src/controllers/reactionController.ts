import { Request, Response } from "express";
import reactionService from "../services/reactionService";
import mongoose from "mongoose";
import { TReactionType } from "../models/reactionModel";
import { Post } from "../models/postModel";
export const getAllReactions = async (req: Request, res: Response) => {
  try {
    const reactions = await reactionService.getAllReactions();
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
};
export const getAllReactionsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    const reactionsByPostId = await reactionService.getAllReactionsByPostId(
      postId
    );
    res.status(200).json(reactionsByPostId);
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
};
export const addReaction = async (req: Request, res: Response) => {
  try {
    const { userId, postId, reactionType } = req.body;
    console.log(userId);
    console.log(postId);

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res.status(400).json({ error: "Invalid userId or postId" });
    }
    const newReaction = {
      userId,
      postId,
      reactionType,
    };
    const reaction = await reactionService.insertReaction(newReaction);
    await Post.findByIdAndUpdate(postId, {
      $push: { reactions: reaction._id },
    });
    res.status(200).json(reaction);
  } catch (error) {
    res.status(500).json({ message: "server Error " });
  }
};

export const updateReaction = async (req: Request, res: Response) => {
  try {
    const { reactionId } = req.params;
    const { reactionType } = req.body;
    const updatedReaction = await reactionService.updateReaction(
      reactionId,
      reactionType
    );
    res.status(200).json(updatedReaction);
  } catch (error) {
    res.status(500).json("server Error ");
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const { reactionId } = req.params;
    const removedReaction = await reactionService.removeReaction(reactionId);
    await Post.findByIdAndUpdate(removedReaction?._id, {
      $pull: { reactions: reactionId },
    });
    res.status(200).json(removedReaction);
  } catch (error) {
    res.status(500).json("server Error");
  }
};
