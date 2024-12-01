import PostViewer from "../PostViwer/PostViewer";
import { useUserPosts } from "@hooks/apis/post/useUserPosts";
import InfiniteScroll from "react-infinite-scroll-component";
const PostContainer = () => {
  const userId = "66e300c7b792400505dbb647";
  const { data, status, hasNextPage, fetchNextPage } = useUserPosts(userId);
  const items = data ? data.pages.flatMap((page) => page.data) : [];

  const loadMoreItems = !hasNextPage ? () => {} : fetchNextPage;

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMoreItems}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      scrollThreshold={0.7}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items.map((i) => (
        <PostViewer key={i._id} {...i} />
      ))}
    </InfiniteScroll>
  );
};

export default PostContainer;
