import styled from "styled-components";
import { boxShadow4Sides } from "@utils/colors";
import Reaction from "../Reaction/Reaction";
import useAddNewReaction from "@hooks/apis/reaction/useAddNewReaction";
import { TReaction, TReactionType } from "@types";
import useUpateReaction from "@hooks/apis/reaction/useUpateReaction";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 40px;
  border: 2px solid black;
  box-shadow: ${boxShadow4Sides};
`;
type TReactionContainer = {
  userId: string;
  postId: string;
  hasReaction: TReaction | undefined;
  refetchReactions: () => void;
};
const ReactionsContainer = ({
  userId,
  postId,
  hasReaction,
  refetchReactions,
}: TReactionContainer) => {
  const { mutate: addReaction, isSuccess: isAddSuccess } =
    useAddNewReaction(postId);
  const { mutate: updateReaction, isSuccess: isUpdateSuccess } =
    useUpateReaction(postId);

  useEffect(() => {
    if (isAddSuccess || isUpdateSuccess) refetchReactions();
  }, [isAddSuccess, isUpdateSuccess, refetchReactions]);
  const handleOnClick = async (type: string) => {
    if (hasReaction?._id) {
      updateReaction({
        reactionId: hasReaction?._id,
        reactionType: type,
      });
    } else {
      addReaction({ userId, postId, reactionType: type as TReactionType });
    }
  };
  return (
    <Wrapper>
      <Reaction type="liked" handleClick={handleOnClick} />
      <Reaction type="loved" handleClick={handleOnClick} />
      <Reaction type="supported" handleClick={handleOnClick} />
      <Reaction type="funny" handleClick={handleOnClick} />
      <Reaction type="surprised" handleClick={handleOnClick} />
      <Reaction type="sad" handleClick={handleOnClick} />
      <Reaction type="angry" handleClick={handleOnClick} />
    </Wrapper>
  );
};

export default ReactionsContainer;
