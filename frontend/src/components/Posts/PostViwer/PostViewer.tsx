import { TReaction, type TPost } from "@types";
import { memo, useState } from "react";
import styled from "styled-components";
import PersonalImg from "../components/PersonalImg/PersonalImg";
import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import Icon from "@components/Common/Icon/Icon";
import { boxShadow4Sides, hoverColor } from "@utils/colors";
import ImageSwiper from "../components/ImagesContainer/ImageSwiper";
import Modal from "@components/Common/Modal/Modal";
import PostPopup from "../Popups/PostPopup";

import CommentsSide from "./components/CommentsSide";
import ReactionsSide from "./components/ReactionsSide";
import usePostComments from "@hooks/apis/comment/usePostComments";
import usePostReactions from "@hooks/apis/reaction/usePostReactions";

const Wrapper = styled.div`
  width: 32%;
  margin: 0px auto 20px;
  padding-bottom: 5px;
  box-shadow: ${boxShadow4Sides};
  position: relative;
`;
const TextsWrapper = styled.div`
  padding: 20px;
`;
const Name = styled.p`
  margin: 0;
  font-weight: bold;
`;
const Text = styled.p`
  margin: 30px 0 0 0;
`;

const EllipsisWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PostViewer = memo(({ _id, userId, text, imgs, reactions }: TPost) => {
  const { data: comments, refetch } = usePostComments(_id);
  const { data: reactionsRequest, refetch: refetchReactions } =
    usePostReactions(_id);

  const hasReaction = reactionsRequest
    ? reactionsRequest?.find((r: TReaction) => r.userId === userId)
    : reactions?.find((r: TReaction) => r.userId === userId);
  const [isModalOpend, setIsModalOpend] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const openModal = () => {
    setIsModalOpend(true);
  };

  const handleShowComments = () => {
    if (!showComments && !comments) refetch();
    setShowComments(!showComments);
  };
  const handleShowReactions = () => {
    setShowReactions(true);
  };
  const handleHideReactions = () => {
    setShowReactions(false);
  };

  const icons = [
    {
      icon: "like",
      text: "like",
      onMouseEnter: handleShowReactions,
      onMouseLeave: handleHideReactions,
    },
    {
      icon: "comment",
      text: "comment",
      onclick: handleShowComments,
    },
    { icon: "share", text: "share" },
  ];
  if (hasReaction) icons.shift();
  return (
    <Wrapper key={_id || userId}>
      <Modal $isopen={isModalOpend} onClose={() => setIsModalOpend(false)}>
        <PostPopup
          userId={userId}
          postId={_id}
          closeModal={() => setIsModalOpend(false)}
        />
      </Modal>
      <EllipsisWrapper onClick={openModal}>
        <Icon
          icon="ellipsis"
          width="30px"
          height="30px"
          $xposition="center"
          $yposition="center"
          $bghover={hoverColor}
          $clickable="true"
          $borderradius="50%"
        />
      </EllipsisWrapper>
      <TextsWrapper>
        <FlexWrapper $yposition="center" $gap="10px">
          <PersonalImg />
          <Name>Anas Attar</Name>
        </FlexWrapper>
        <Text>{text}</Text>
      </TextsWrapper>
      <ImageSwiper images={imgs ?? []} />
      <ReactionsSide
        userId={userId}
        postId={_id}
        showReactions={showReactions}
        hasReaction={hasReaction}
        icons={icons}
        handleShowComments={handleShowComments}
        handleShowReactions={handleShowReactions}
        handleHideReactions={handleHideReactions}
        refetchReactions={refetchReactions}
      />
      <CommentsSide
        userId={userId}
        postId={_id}
        showComments={showComments}
        comments={comments}
        refetch={refetch}
      />
    </Wrapper>
  );
});
export default PostViewer;
