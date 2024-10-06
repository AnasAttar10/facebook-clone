import PostViewer from "../PostViwer/PostViewer";
import { TPost } from "@types";
import ListViewer from "@components/Common/ListViewer/ListViewer";
type TPostContianer = {
  posts: TPost[];
};
const PostContainer = ({ posts }: TPostContianer) => {
  return (
    <ListViewer
      items={posts}
      renderItem={(item) => <PostViewer {...item} />}
      hEachPost={900}
      hScrollableArea={900 * posts.length}
      $showScroll={false}
    />
  );
};

export default PostContainer;
