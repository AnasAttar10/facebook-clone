import { TPost } from "@types";
import axiosInstance from "../api/axios";
// import axios from "axios";

export const fetchPostsByUserId = async (userId: string) => {
  return (await axiosInstance.get<TPost[]>(`/posts/${userId}`)).data;
};

export const addPost = async (data: FormData) => {
  return (
    await axiosInstance.post("/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};

export const removePost = async (postId: string) => {
  return (await axiosInstance.delete(`/posts/${postId}`)).data._id;
};
