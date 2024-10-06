import { removePost } from "@services/postApi";
import { TPost } from "@types";
import { useMutation, useQueryClient } from "react-query";

const useRemovePost = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removePost, {
    onSuccess: (removedPostId) => {
      queryClient.setQueryData<TPost[]>(["posts", userId], (oldPosts = []) => {
        if (!oldPosts) return oldPosts;
        const postsArray = oldPosts ?? [];
        return postsArray.filter((p) => p._id !== removedPostId);
      });
    },
  });
};

export default useRemovePost;
