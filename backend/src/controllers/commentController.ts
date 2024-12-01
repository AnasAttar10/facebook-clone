import {
  createOne,
  deleteMany,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../services/handlersFactory";
import { Comment } from "../models/commentModel";
import { Request, Response, NextFunction } from "express";

// midelwares =>

// @desc : it's midelware to remove comments based on post Id
// @route : Delete /posts/:id
// @access : private
export const deleteComments = deleteMany(Comment);

// @desc : midelware to set post params to body
// @route : Post posts/:id/comments/
// @access : private
export const setPostParamToBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req?.body?.postId) req.body.postId = req.params.postId;
  next();
};

// routes =>

// @desc : get All comments
// @route : Get /comments/
// @access : public
export const getAllComments = getAll(Comment);

// @desc : get one comment
// @route : Get /comments/:id
// @access : public
export const getComment = getOne(Comment);

// @desc : insert new comment
// @route : Post /comments
// @access : private
export const addComment = createOne(Comment);

// @desc : update a comment
// @route : Put /comments
// @access : private
export const updateComment = updateOne(Comment, "set", "text");

// @desc : remove a comment
// @route : Delete /comments
// @access : private
export const deleteComment = deleteOne(Comment);
