import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import styled from "styled-components";
import PersonalImg from "../PersonalImg/PersonalImg";
import { hoverColor, mainColor } from "@utils/colors";
import { TComment } from "@types";
import Modal from "@components/Common/Modal/Modal";
import { useState } from "react";
import Icon from "@components/Common/Icon/Icon";
import CommentPopup from "@components/Posts/Popups/CommentPopup";

const Wrapper = styled.div``;
const TextWrapper = styled.div`
  position: relative;
  background-color: ${mainColor};
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  margin-bottom: 10px;
`;
const Name = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 0;
`;
const Text = styled.p`
  margin: 0;
  font-size: 14px;
`;
const EllipsisWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
const Comment = ({ _id, userId, postId, text }: TComment) => {
  const [isModalOpend, setIsModalOpend] = useState(false);

  const openModal = () => {
    setIsModalOpend(true);
  };

  return (
    <Wrapper key={_id}>
      <Modal
        $isopen={isModalOpend}
        onClose={() => setIsModalOpend(false)}
        $showCloseIcon={false}
      >
        <CommentPopup
          userId={userId}
          postId={postId}
          commentId={_id}
          closeModal={() => setIsModalOpend(false)}
        />
      </Modal>

      <FlexWrapper $gap="5px" key={userId}>
        <PersonalImg />
        <TextWrapper>
          <Name>Anas Attar</Name>
          <Text>{text}</Text>
          <EllipsisWrapper onClick={openModal}>
            <Icon
              icon="ellipsis"
              width="20px"
              height="20px"
              $xposition="center"
              $yposition="center"
              $bg={mainColor}
              $bghover={hoverColor}
              $clickable="true"
              $borderradius="50%"
              size="sm"
            />
          </EllipsisWrapper>
        </TextWrapper>
      </FlexWrapper>
    </Wrapper>
  );
};

export default Comment;
