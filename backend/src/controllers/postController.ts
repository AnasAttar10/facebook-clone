import { Request, Response } from "express";
import postService from "../services/postService";
import { uploadMultiple } from "../middlewares/upload/uploadMultiple";
import { Comment } from "../models/commentModel";
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "server Error " });
  }
};
export const getAllPostsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await postService.getAllPostsByUserId(userId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "server Error" });
  }
};
export const addNewPost = async (req: Request, res: Response) => {
  try {
    const newPost = req.body;
    const images = await uploadMultiple(req, res);
    newPost.imgs = images;
    delete newPost["folder"];
    const post = await postService.insertPost(newPost);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "server Error Anas" });
  }
};
export const removePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const removedPost = await postService.removePost(postId);
    await Comment.deleteMany({
      postId: removedPost?._id,
    }).populate("comments");
    res.status(200).json(removedPost);
  } catch (error) {
    res.status(500).json("serverError");
  }
};
