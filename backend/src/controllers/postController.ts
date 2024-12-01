import { NextFunction, Request, Response } from "express";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../services/handlersFactory";
import { Post } from "../models/postModel";

// midelwares =>
export const setPostIdToBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.body.postId) req.body.postId = req.params.id;
  next();
};

// @desc : midelware to set user params to body
// @route : Post users/:id/posts/
// @access : private
export const setUserParamToBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req?.body?.userId) req.body.userId = req.params.userId;
  next();
};

// routes =>

// @desc : get all posts
// @route : Get /posts
// @access : public
export const getAllPosts = getAll(Post);

// @desc : get a post
// @route : Get /posts/:id
// @access : public
export const getPost = getOne(Post);

// @desc : create a post
// @route : Post /posts
// @access : private
export const addNewPost = createOne(Post);

// @desc : update a post
// @route : Put /posts/:id
// @access : private
export const updatePost = updateOne(Post, "set");

// @desc : delete a post
// @route : Delete /posts/:id
// @access : private
export const deletePost = deleteOne(Post);
