import { addNewComment } from "@services/commentApi";
import { useMutation, useQueryClient } from "react-query";

export const useAddNewComment = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addNewComment, {
    onSuccess: () => {
      console.log("added onSuccess");

      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};
