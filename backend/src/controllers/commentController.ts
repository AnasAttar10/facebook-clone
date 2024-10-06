import { Request, Response } from "express";
import commentService from "../services/commentService";
import mongoose from "mongoose";
import { Post } from "../models/postModel";
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addComment = async (req: Request, res: Response) => {
  try {
    const { userId, postId, text } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(postId)
    ) {
      return res.status(400).json({ error: "Invalid userId or postId" });
    }
    const newComment = {
      userId,
      postId,
      text,
    };
    const comment = await commentService.insertComment(newComment);
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const removedComment = await commentService.removeComment(commentId);
    await Post.findByIdAndUpdate(removedComment?.postId, {
      $pull: { comments: commentId },
    });
    res.status(200).json(removedComment);
  } catch (error) {
    res.status(500).json("server Error");
  }
};
