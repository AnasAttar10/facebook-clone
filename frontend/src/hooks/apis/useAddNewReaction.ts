import { addNewReaction } from "@services/reactionApi";
import { TPost } from "@types";
import { useMutation, useQueryClient } from "react-query";

const useAddNewReaction = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addNewReaction, {
    onSuccess: (newReaction) => {
      queryClient.setQueryData<TPost[]>(["posts", userId], (oldPosts = []) => {
        if (!oldPosts) return [];
        const postIndex = oldPosts.findIndex((p) => p._id === postId);
        if (postIndex === -1) return oldPosts;
        const updatedPost = {
          ...oldPosts[postIndex],
          reactions: [...(oldPosts[postIndex].reactions || []), newReaction],
        };
        oldPosts[postIndex] = updatedPost;
        return oldPosts;
      });
    },
  });
};

export default useAddNewReaction;
