import { addPost } from "@services/postApi";
import { useMutation, useQueryClient } from "react-query";

export const useAddNewPost = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", userId], { exact: true });
    },
  });
};
