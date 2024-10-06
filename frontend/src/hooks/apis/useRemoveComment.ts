import { removeComment } from "@services/commentApi";
import { TPost } from "@types";
import { useMutation, useQueryClient } from "react-query";

const useRemoveComment = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removeComment, {
    onSuccess: (deletedCommentId) => {
      queryClient.setQueryData<TPost[]>(["posts", userId], (oldPosts = []) => {
        if (!oldPosts) return [];
        const postsArray = oldPosts ? oldPosts : [];
        const postIndex = postsArray.findIndex((p) => p._id === postId);
        if (postIndex === -1) return postsArray;
        const updatedPost = {
          ...postsArray[postIndex],
          comments: [
            ...postsArray[postIndex].comments.filter(
              (c) => c._id !== deletedCommentId
            ),
          ],
        };
        postsArray[postIndex] = updatedPost;
        return postsArray;
      });
    },
  });
};

export default useRemoveComment;
