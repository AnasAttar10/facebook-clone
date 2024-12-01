import { addNewReaction } from "@services/reactionApi";
import { useMutation, useQueryClient } from "react-query";

const useAddNewReaction = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addNewReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reactions", postId]);
    },
  });
};

export default useAddNewReaction;
