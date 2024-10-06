import { addPost } from "@services/postApi";
import { TPostResponse } from "@types";
import { useMutation, useQueryClient } from "react-query";

export const useAddNewPost = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: (newPost) => {
      queryClient.setQueryData<TPostResponse[]>(
        ["posts", userId],
        (oldPosts = []) => {
          // If the old data is undefined or null, return a new array with the new post
          if (!oldPosts) {
            return [newPost];
          }

          // Update the cached data by adding the new post to the list
          const postsArray = oldPosts ? oldPosts : [];
          return [...postsArray, newPost];
        }
      );
    },
  });
};
