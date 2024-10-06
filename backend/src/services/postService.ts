import { type IPost, Post } from "../models/postModel";

const getAllPosts = async () => {
  return await Post.find();
};
const getAllPostsByUserId = async (userId: string) => {
  return await Post.find({ userId }).populate("comments").populate("reactions");
};
const insertPost = async (newPost: IPost) => {
  return await Post.create(newPost);
};
const removePost = async (_id: string) => {
  return await Post.findByIdAndDelete({ _id });
};
export default { getAllPosts, getAllPostsByUserId, insertPost, removePost };
