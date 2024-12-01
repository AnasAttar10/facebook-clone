import axiosInstance from "../api/axios";
import { PaginatedPosts } from "@hooks/apis/post/useUserPosts";
export const fetchPostsByUserId = async (
  { pageParam = 1, limit = 10 }: { pageParam: number; limit: number },
  userId: string
): Promise<PaginatedPosts> => {
  return (
    await axiosInstance.get<PaginatedPosts>(
      `/users/${userId}/posts?page=${pageParam}&limit=${limit}`
    )
  ).data;
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
