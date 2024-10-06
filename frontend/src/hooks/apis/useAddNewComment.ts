import { addNewComment } from "@services/commentApi";
import { TPost } from "@types";
import { useMutation, useQueryClient } from "react-query";

export const useAddNewComment = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addNewComment, {
    onSuccess: (newComment) => {
      queryClient.setQueryData<TPost[]>(["posts", userId], (oldPosts = []) => {
        if (!oldPosts) return [];
        const postsArray = oldPosts ? oldPosts : [];
        const postIndex = postsArray.findIndex((p) => p._id === postId);
        if (postIndex == -1) return oldPosts;
        const updatedPost = {
          ...postsArray[postIndex],
          comments: [...(postsArray[postIndex].comments || []), newComment],
        };
        postsArray[postIndex] = updatedPost;
        return postsArray;
      });
    },
  });
};
