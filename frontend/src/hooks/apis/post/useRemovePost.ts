import { removePost } from "@services/postApi";
import { useMutation, useQueryClient } from "react-query";

const useRemovePost = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(removePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", userId]);
    },
  });
};

export default useRemovePost;
