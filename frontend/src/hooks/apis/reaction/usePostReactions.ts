import { getAllReactionsByPostId } from "@services/reactionApi";
import { useQuery } from "react-query";

const usePostReactions = (postId: string) => {
  return useQuery(
    ["reactions", postId],
    () => getAllReactionsByPostId(postId),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: false,
    }
  );
};

export default usePostReactions;
