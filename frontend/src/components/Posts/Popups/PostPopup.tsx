import styled from "styled-components";
import Divider from "../components/Divider/Divider";
import useRemovePost from "@hooks/apis/useRemovePost";

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Option = styled.li`
  font-weight: bold;
  text-align: center;
  margin: 10px;
  cursor: pointer;
`;
type TPostPopup = {
  userId: string;
  postId: string;
  closeModal: () => void;
};
const PostPopup = ({ userId, postId, closeModal }: TPostPopup) => {
  const { mutate } = useRemovePost(userId);
  const handleDetelePost = () => {
    mutate(postId);
    closeModal();
  };
  return (
    <Wrapper>
      <Option onClick={handleDetelePost}>Delete</Option>
      <Divider />
      <Option onClick={() => closeModal()}>Cancle</Option>
    </Wrapper>
  );
};

export default PostPopup;
