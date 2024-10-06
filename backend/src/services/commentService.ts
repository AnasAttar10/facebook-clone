import { Comment, IComment } from "../models/commentModel";

const getComments = async () => {
  return await Comment.find();
};
const getCommentsByPostId = async (postId: string) => {
  return await Comment.find({ postId });
};
const insertComment = async (newComment: IComment) => {
  return await Comment.create(newComment);
};
const removeComment = async (_id: string) => {
  return await Comment.findByIdAndDelete({ _id });
};
export default {
  getComments,
  getCommentsByPostId,
  insertComment,
  removeComment,
};
