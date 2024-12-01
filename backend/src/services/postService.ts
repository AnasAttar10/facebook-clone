import { Model } from "mongoose";
import { type IPost, Post } from "../models/postModel";
// import ApiFeature from "../utils/ApiFeatures";
// const LIMIT = 5;
const getAllPosts = (filterObject: {}) => {
  return Post.find(filterObject);
};
// const getAllPostsByUserId = async (userId: string, page: number = 1) => {
//   try {
//     const totalPosts = await Post.countDocuments({ userId });
//     const totalPages = Math.ceil(totalPosts / LIMIT);
//     const posts = await Post.find({ userId })
//       .populate("reactions")
//       .skip((page - 1) * LIMIT)
//       .limit(LIMIT);
//     // .sort({ createdAt: -1 });
//     return {
//       data: posts,
//       currentPage: page,
//       totalPages,
//       totalPosts,
//       hasMore: page < totalPages,
//       nextPage: page < totalPages ? page + 1 : null,
//     };
//   } catch (error) {
//     return error;
//   }
// };

const getPostByPostId = async (postId: string) => {
  return await Post.findById(postId);
};
const insertPost = async (newPost: IPost) => {
  return await Post.create(newPost);
};
const deleteDocument = async <T>(
  Model: { findByIdAndDelete: (query: { _id: string }) => Promise<T | null> },
  _id: string
) => {
  return await Model.findByIdAndDelete({ _id });
};
// const removePost = async (_id: string) => {
//   return await Post.findByIdAndDelete({ _id });
// };
export default {
  getAllPosts,
  // getAllPostsByUserId,
  getPostByPostId,
  insertPost,
  // removePost,
  deleteDocument,
};
