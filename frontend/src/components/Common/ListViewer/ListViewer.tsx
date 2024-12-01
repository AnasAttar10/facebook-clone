import { FixedSizeList as List } from "react-window";
type TListViewer<T> = {
  items: T[];
  renderItem: (record: T) => React.ReactNode;
  hEachPost: number;
  hScrollableArea: number;
  $showScroll: boolean;
};

function ListViewer<T>({
  items,
  renderItem,
  hScrollableArea,
  hEachPost,
  $showScroll = true,
}: TListViewer<T>) {
  const renderRow = ({ index }: { index: number }) => (
    <div>{renderItem(items[index])}</div>
  );

  return (
    <List
      style={{ overflow: $showScroll ? "auto" : "hidden" }}
      height={hScrollableArea} // Height of the scrollable area
      itemCount={items.length} // Number of posts
      itemSize={hEachPost} // Approximate height of each post (in pixels)
      width={"100%"} // Width of the container
    >
      {renderRow}
    </List>
  );
}

export default ListViewer;
