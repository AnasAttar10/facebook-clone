import { removeComment } from "@services/commentApi";
import { useMutation, useQueryClient } from "react-query";

const useRemoveComment = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};

export default useRemoveComment;
