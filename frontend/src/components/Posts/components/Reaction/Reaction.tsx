import Lottie from "lottie-react";
import Angry from "@assets/LottieFiles/angry.json";
import Funny from "@assets/LottieFiles/funny.json";
import Liked from "@assets/LottieFiles/liked.json";
import Loved from "@assets/LottieFiles/loved.json";
import Sad from "@assets/LottieFiles/sad.json";
import Supported from "@assets/LottieFiles/supported.json";
import Wow from "@assets/LottieFiles/wow.json";
import styled from "styled-components";
import { useState } from "react";
type TReaction = {
  width?: string;
  height?: string;
  type: keyof typeof types;
  handleClick?: (type: string) => void;
};
type TActivedReaction = Omit<TReaction, "type">;
const ActivedReaction = styled.div<TActivedReaction>`
  width: ${({ width }) => width ?? "50px"};
  height: ${({ height }) => height ?? "50px"};
  cursor: pointer;
`;

const types = {
  angry: Angry,
  funny: Funny,
  liked: Liked,
  loved: Loved,
  sad: Sad,
  supported: Supported,
  surprised: Wow,
};

const Reaction = ({
  width = "50px",
  height = "50px",
  type,
  handleClick,
}: TReaction) => {
  const targetType = types[type];
  const [isHover, setIsHover] = useState(false);
  const getWidth = () => {
    return parseInt(width) + 10 + "px";
  };
  const getHeight = () => {
    return parseInt(height) + 10 + "px";
  };
  return (
    <ActivedReaction
      width={isHover ? getWidth() : width}
      height={isHover ? getHeight() : height}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => handleClick && handleClick(type)}
    >
      <Lottie animationData={targetType} loop={true} />
    </ActivedReaction>
  );
};

export default Reaction;
