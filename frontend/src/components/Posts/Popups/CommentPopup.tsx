import styled from "styled-components";
import Divider from "../components/Divider/Divider";
import useRemoveComment from "@hooks/apis/comment/useRemoveComment";

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
type TCommentPopup = {
  userId: string;
  postId: string;
  commentId: string;
  closeModal: () => void;
};
const CommentPopup = ({ postId, commentId, closeModal }: TCommentPopup) => {
  const { mutate } = useRemoveComment(postId);
  const handleDeteleComment = () => {
    mutate(commentId);
    closeModal();
  };
  return (
    <Wrapper>
      <Option onClick={handleDeteleComment}>Delete</Option>
      <Divider />
      <Option onClick={() => closeModal()}>Cancle</Option>
    </Wrapper>
  );
};

export default CommentPopup;
