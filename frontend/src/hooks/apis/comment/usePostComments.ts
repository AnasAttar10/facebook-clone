import { getCommentsbyPostId } from "@services/commentApi";
import { useQuery } from "react-query";

const usePostComments = (postId: string) => {
  return useQuery(["comments", postId], () => getCommentsbyPostId(postId), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: false,
  });
};

export default usePostComments;
