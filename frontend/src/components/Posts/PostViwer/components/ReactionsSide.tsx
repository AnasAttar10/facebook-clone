import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import Icon, { TIcons } from "@components/Common/Icon/Icon";
import Divider from "@components/Posts/components/Divider/Divider";
import Reaction from "@components/Posts/components/Reaction/Reaction";
import ReactionsContainer from "@components/Posts/components/ReactionsContainer/ReactionsContainer";
import { TPostIcons, TReaction, TReactionType } from "@types";
import { hoverColor } from "@utils/colors";
import styled from "styled-components";
const ReactionsInfo = styled.p`
  font-size: 14px;
  color: gray;
  cursor: pointer;
  margin: 0;
`;
const ActionsWrapper = styled.div`
  padding: 10px;
`;
const ReactionsAndIconsWrapper = styled.div`
  position: relative;
`;
type TReactionWrapper = { $isOpen: boolean };
const ReactionsWrapper = styled.div<TReactionWrapper>`
  width: 100%;
  position: absolute;
  top: -15px;
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
type TReactionSide = {
  userId: string;
  postId: string;
  showReactions: boolean;
  hasReaction: TReaction | undefined;
  handleShowComments: () => void;
  handleShowReactions: () => void;
  handleHideReactions: () => void;
  icons: TPostIcons[];
  refetchReactions: () => void;
};
const ReactionsSide = ({
  userId,
  postId,
  showReactions,
  hasReaction,
  handleShowComments,
  handleShowReactions,
  handleHideReactions,
  icons,
  refetchReactions,
}: TReactionSide) => {
  const reactionsTexts = {
    funny: { text: "hhhh", color: "#FBD05A" },
    loved: { text: "love", color: "#F8A3B1" },
    surprised: { text: "wow", color: "#FBD05A" },
    sad: { text: "sad", color: "#FBD05A" },
    supported: { text: "support", color: "#F8A3B1" },
    liked: { text: "like", color: "blue" },
    angry: { text: "angry", color: "orange" },
  };
  return (
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
        onMouseEnter={handleShowReactions}
        onMouseLeave={handleHideReactions}
      >
        <ReactionsContainer
          userId={userId}
          postId={postId}
          hasReaction={hasReaction}
          refetchReactions={refetchReactions}
        />
      </ReactionsWrapper>
      <FlexWrapper $xposition="center">
        {hasReaction && (
          <ReactionWrapper
            onMouseEnter={handleShowReactions}
            onMouseLeave={handleHideReactions}
          >
            <FlexWrapper $xposition="center" $yposition="center" $gap="5px">
              <Reaction
                type={hasReaction.reactionType as TReactionType}
                width="30px"
                height="30px"
              />
              <ReactionText
                color={
                  reactionsTexts[hasReaction.reactionType as TReactionType]
                    .color
                }
              >
                {reactionsTexts[hasReaction.reactionType as TReactionType].text}
              </ReactionText>
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
  );
};

export default ReactionsSide;
