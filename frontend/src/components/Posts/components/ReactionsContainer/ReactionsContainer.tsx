import styled from "styled-components";
import { boxShadow4Sides } from "@utils/colors";
import Reaction from "../Reaction/Reaction";
import useAddNewReaction from "@hooks/apis/useAddNewReaction";
import { TReactionType } from "@types";

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
type TReactionContainer = { userId: string; postId: string };
const ReactionsContainer = ({ userId, postId }: TReactionContainer) => {
  const { mutate } = useAddNewReaction(userId, postId);
  const handleOnClick = (type: string) => {
    mutate({ userId, postId, reactionType: type as TReactionType });
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
