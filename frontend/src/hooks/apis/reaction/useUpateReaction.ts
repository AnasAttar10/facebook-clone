import { updateReaction } from "@services/reactionApi";
import { useMutation, useQueryClient } from "react-query";
type TUpdateReaction = { reactionId: string; reactionType: string };
const useUpateReaction = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ reactionId, reactionType }: TUpdateReaction) =>
      updateReaction(reactionId, reactionType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reactions", postId]);
      },
    }
  );
};

export default useUpateReaction;
