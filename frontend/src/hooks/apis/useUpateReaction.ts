import { updateReaction } from "@services/reactionApi";
import { TPost } from "@types";
import { useMutation, useQueryClient } from "react-query";

const useUpateReaction = (
  userId: string,
  postId: string,
  reactionId: string,
  reactionType: string
) => {
  const queryClient = useQueryClient();
  return useMutation(() => updateReaction(reactionId, reactionType), {
    onSuccess: (updatedReaction) => {
      queryClient.setQueryData<TPost[]>(["posts", userId], (oldPosts = []) => {
        if (!oldPosts) return [];
        const postIndex = oldPosts.findIndex((p) => p._id === postId);
        if (postIndex === -1) return oldPosts;
        const updatedPost = {
          ...oldPosts[postIndex],
          reactions: [
            ...oldPosts[postIndex].reactions.map((r) => {
              if (r._id === reactionId) return updatedReaction;
              else return r;
            }),
          ],
        };
        oldPosts[postIndex] = updatedPost;
        return oldPosts;
      });
    },
  });
};

export default useUpateReaction;
