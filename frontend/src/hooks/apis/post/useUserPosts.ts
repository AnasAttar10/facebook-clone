import { fetchPostsByUserId } from "@services/postApi";
import { TPost } from "@types";
import { useInfiniteQuery } from "react-query";
export type PaginatedPosts = {
  data: TPost[];
  hasMore: boolean;
};
export const useUserPosts = (userId: string) => {
  return useInfiniteQuery<PaginatedPosts>(
    ["posts", userId],
    ({ pageParam = 1 }) => fetchPostsByUserId({ pageParam, limit: 10 }, userId),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.hasMore) {
          return allPages.length + 1; // Increment page number
        }
        return undefined; // No more pages
      },
    }
  );
};
