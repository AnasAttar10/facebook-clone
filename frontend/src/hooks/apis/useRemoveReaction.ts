import { removeReaction } from "@services/reactionApi";
import { TPost } from "@types";
import { useMutation, useQueryClient } from "react-query";

const useRemoveReaction = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removeReaction, {
    onSuccess: (deletedReactionId) => {
      queryClient.setQueryData<TPost[]>(["posts", userId], (oldPosts = []) => {
        if (!oldPosts) return [];
        const postsArray = oldPosts ? oldPosts : [];
        const postIndex = postsArray.findIndex((p) => p._id === postId);
        if (postIndex === -1) return postsArray;
        const updatedPost = {
          ...postsArray[postIndex],
          reactions: [
            ...postsArray[postIndex].reactions.filter(
              (c) => c._id !== deletedReactionId
            ),
          ],
        };
        postsArray[postIndex] = updatedPost;
        return postsArray;
      });
    },
  });
};

export default useRemoveReaction;
