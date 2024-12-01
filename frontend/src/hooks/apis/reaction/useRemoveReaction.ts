import { removeReaction } from "@services/reactionApi";
import { useMutation, useQueryClient } from "react-query";

const useRemoveReaction = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removeReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reactions", postId]);
    },
  });
};

export default useRemoveReaction;
