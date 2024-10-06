import { TReactionType, type TPost } from "@types";
import { memo, useState } from "react";
import styled from "styled-components";
import PersonalImg from "../components/PersonalImg/PersonalImg";
import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import Icon, { TIcons } from "@components/Common/Icon/Icon";
import { boxShadow4Sides, hoverColor, mainColor } from "@utils/colors";
import Divider from "../components/Divider/Divider";
import ListViewer from "@components/Common/ListViewer/ListViewer";
import Comment from "../components/Comment/Comment";
import ImageSwiper from "../components/ImagesContainer/ImageSwiper";
import { useAddNewComment } from "@hooks/apis/useAddNewComment";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@components/Common/Modal/Modal";
import PostPopup from "../Popups/PostPopup";
import ReactionsContainer from "../components/ReactionsContainer/ReactionsContainer";
import Reaction from "../components/Reaction/Reaction";

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
const ReactionsInfo = styled.p`
  font-size: 14px;
  color: gray;
  cursor: pointer;
  margin: 0;
`;
const EmptyCommentsMessage = styled.p`
  font-size: 14px;
  color: gray;
  cursor: pointer;
  margin: 0;
`;
const ActionsWrapper = styled.div`
  padding: 10px;
`;
const CommentsWrapper = styled.div`
  padding: 10px;
`;
const AddCommentWrapper = styled.form`
  position: relative;
`;
const IconWrapper = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const AddComment = styled.textarea`
  background-color: ${mainColor};
  border-radius: 10px;
  padding: 8px;
  width: 85%;
  outline: none;
  font-size: 14px;
  border: none;
`;
const EllipsisWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ReactionsAndIconsWrapper = styled.div`
  position: relative;
`;
type TReactionWrapper = { $isOpen: boolean };
const ReactionsWrapper = styled.div<TReactionWrapper>`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition: opacity 0.2s ease;
`;
const ReactionWrapper = styled.div`
  width: 33.3%;
  cursor: pointer;
`;
const ReactionText = styled.p`
  margin: 0;
  color: ${({ color }) => color ?? "black"};
`;

type Inputs = {
  text: string;
};
const PostViewer = memo(
  ({ _id, userId, text, imgs, comments, reactions }: TPost) => {
    const hasReaction = reactions.find((r) => r.userId === userId);
    const [isModalOpend, setIsModalOpend] = useState(false);
    const [showComments, setShowComments] = useState(true);
    const [showReactions, setShowReactions] = useState(false);
    const openModal = () => {
      setIsModalOpend(true);
    };

    const handleShowComments = () => {
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
        activeColor: "blue",
        text: "like",
        onMouseEnter: handleShowReactions,
        onMouseLeave: handleHideReactions,
      },
      {
        icon: "comment",
        activeColor: "",
        text: "comment",
        onclick: handleShowComments,
      },
      { icon: "share", activeColor: "", text: "share" },
    ];
    const reactionsTexts = [
      { key: "funny", text: "hhhh", color: "yellow" },
      { key: "loved", text: "loved", color: "red" },
    ];
    if (hasReaction) icons.shift();
    const { register, handleSubmit } = useForm<Inputs>();
    const { mutate } = useAddNewComment(userId, _id);
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const newComment = {
        userId,
        postId: _id,
        text: data.text,
      };
      mutate(newComment);
    };
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
        <ReactionsAndIconsWrapper>
          <ActionsWrapper>
            <FlexWrapper $yposition="center" $xposition="space-between">
              <ReactionsInfo>Hassan,Osed and 37 other people </ReactionsInfo>
              <FlexWrapper width="20%" $gap="15px">
                <Icon
                  icon="comment"
                  size="1x"
                  text="16"
                  $gap="2px"
                  color="gray"
                  $yposition="center"
                  $clickable="true"
                  onclick={handleShowComments}
                />
                <Icon
                  icon="share"
                  size="1x"
                  text="8"
                  $gap="2px"
                  color="gray"
                  $yposition="center"
                />
              </FlexWrapper>
            </FlexWrapper>
          </ActionsWrapper>
          <Divider $margin={"5px 0"} />
          <ReactionsWrapper
            $isOpen={showReactions}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            <ReactionsContainer userId={userId} postId={_id} />
          </ReactionsWrapper>
          <FlexWrapper $xposition="center">
            {hasReaction && (
              <ReactionWrapper
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                <FlexWrapper $xposition="center" $yposition="center" $gap="5px">
                  <Reaction
                    type={hasReaction.reactionType as TReactionType}
                    width="30px"
                    height="30px"
                  />
                  <ReactionText color="yellow">hhhh</ReactionText>
                </FlexWrapper>
              </ReactionWrapper>
            )}

            {icons.map((i, idx = 1) => (
              <Icon
                key={idx}
                icon={i.icon as TIcons}
                size={"lg"}
                text={i.text}
                width="33.3%"
                height="30px"
                $xposition="center"
                $yposition="center"
                $gap="10px"
                color="gray"
                $bghover={hoverColor}
                $clickable="true"
                $borderradius="5px"
                onclick={i.onclick}
                onMouseEnter={i.onMouseEnter}
                onMouseLeave={i.onMouseLeave}
              />
            ))}
          </FlexWrapper>
        </ReactionsAndIconsWrapper>
        {showComments && (
          <>
            <Divider $margin="5px" />

            <CommentsWrapper>
              {comments && comments?.length > 0 ? (
                <ListViewer
                  items={comments ?? []}
                  renderItem={(item) => <Comment {...item} />}
                  hEachPost={69}
                  hScrollableArea={
                    (comments?.length as number) >= 3
                      ? 69 * 3
                      : 69 * (comments?.length as number)
                  }
                  $showScroll={true}
                />
              ) : (
                <EmptyCommentsMessage>
                  There are no comments
                </EmptyCommentsMessage>
              )}
              <Divider />
              <AddCommentWrapper onSubmit={handleSubmit(onSubmit)}>
                <FlexWrapper $gap="5px" $yposition="center">
                  <PersonalImg />
                  <AddComment {...register("text")} />
                </FlexWrapper>
                <IconWrapper>
                  <Icon
                    icon="send"
                    color="blue"
                    size="sm"
                    $bg={mainColor}
                    $bghover={mainColor}
                    $clickable="true"
                  />
                </IconWrapper>
              </AddCommentWrapper>
            </CommentsWrapper>
          </>
        )}
      </Wrapper>
    );
  }
);
export default PostViewer;
