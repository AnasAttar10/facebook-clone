import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faGamepad,
  faUserGroup,
  faStore,
  faMagnifyingGlass,
  faTv,
  faList,
  faCaretDown,
  faVideo,
  faImage,
  faFaceSmile,
  faUserTag,
  faLocationDot,
  faEllipsis,
  faXmark,
  faThumbsUp,
  faComment,
  faShare,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookMessenger,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const myIcons = {
  home: faHouse,
  bell: faBell,
  game: faGamepad,
  group: faUserGroup,
  market: faStore,
  messanger: faFacebookMessenger,
  search: faMagnifyingGlass,
  tvVideo: faTv,
  faLogo: faFacebook,
  list: faList,
  arrowDown: faCaretDown,
  liveVideo: faVideo,
  image: faImage,
  smile: faFaceSmile,
  userTag: faUserTag,
  locationDot: faLocationDot,
  ellipsis: faEllipsis,
  close: faXmark,
  like: faThumbsUp,
  comment: faComment,
  share: faShare,
  send: faPaperPlane,
};
export type TIcons = keyof typeof myIcons;
type TIconWrapper = {
  icon?: TIcons;
  color?: string;
  size?: SizeProp;
  $xposition?: "start" | "end" | "center" | "space-between";
  $yposition?: "start" | "end" | "center";
  $gap?: string;
  width?: string;
  height?: string;
  $bg?: string;
  $bghover?: string;
  $borderradius?: string;
  $clickable?: "true" | "false";
  $border?: string;
  $borderbottom?: string;
  islink?: boolean;
  to?: string;
  text?: string;
  onclick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
const IconWrapper = styled.div<TIconWrapper>`
  display: flex;
  justify-content: ${(props) => props.$xposition ?? "start"};
  align-items: ${(props) => props.$yposition ?? "start"};
  gap: ${({ $gap }) => $gap ?? "0"};
  width: ${({ width }) => width ?? "100%"};
  height: ${({ height }) => height ?? "auto"};
  background-color: ${({ $bg }) => $bg ?? "white"};
  border-radius: ${({ $borderradius }) => $borderradius ?? "auto"};
  border: ${({ $border }) => $border ?? "none"};
  border-bottom: ${({ $borderbottom }) => $borderbottom ?? "none"};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "auto")};
  &:hover {
    background-color: ${({ $bghover }) => $bghover ?? "white"};
  }
`;
const Text = styled.p`
  margin: 0;
  color: gray;
`;
const Icon = ({
  icon,
  color,
  size,
  width,
  height,
  $bg,
  $bghover,
  $borderradius,
  $xposition,
  $yposition,
  $gap,
  $clickable,
  $border,
  $borderbottom,
  islink,
  to,
  text,
  onclick,
  onMouseEnter,
  onMouseLeave,
}: TIconWrapper) => {
  const targetIcon = myIcons[icon ?? "home"];
  return (
    <>
      {islink ? (
        <NavLink to={to ?? "/"}>
          <IconWrapper
            width={width}
            height={height}
            $bg={$bg}
            $bghover={$bghover}
            $borderradius={$borderradius}
            $xposition={$xposition}
            $yposition={$yposition}
            $gap={$gap}
            $clickable={$clickable}
            $border={$border}
            $borderbottom={$borderbottom}
            onClick={onclick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <FontAwesomeIcon icon={targetIcon} color={color} size={size} />
            {text && <Text>{text}</Text>}
          </IconWrapper>
        </NavLink>
      ) : (
        <IconWrapper
          width={width}
          height={height}
          $bg={$bg}
          $bghover={$bghover}
          $borderradius={$borderradius}
          $xposition={$xposition}
          $yposition={$yposition}
          $gap={$gap}
          $clickable={$clickable}
          $border={$border}
          $borderbottom={$borderbottom}
          onClick={onclick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <FontAwesomeIcon icon={targetIcon} color={color} size={size} />
          {text && <Text>{text}</Text>}
        </IconWrapper>
      )}
    </>
  );
};

export default Icon;
