import { fetchPostsByUserId } from "@services/postApi";
import { useQuery } from "react-query";

export const useUserPosts = (userId: string) => {
  return useQuery(["posts", userId], () => fetchPostsByUserId(userId), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
