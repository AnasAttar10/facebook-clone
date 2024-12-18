import axiosInstance from "../api/axios";
import { TCommentRequest } from "@types";

export const getCommentsbyPostId = async (postId: string) => {
  return (await axiosInstance.get(`/comments/${postId}`)).data;
};
export const addNewComment = async (newComment: TCommentRequest) => {
  return (
    await axiosInstance.post("/comments", newComment, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).data;
};

export const removeComment = async (_id: string) => {
  return (await axiosInstance.delete(`/comments/${_id}`)).data._id;
};
