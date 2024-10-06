import Icon from "@components/Common/Icon/Icon";
import { hoverColor, mainColor } from "@utils/colors";
import styled from "styled-components";
type TPersonalImg = {
  width?: string;
  height?: string;
  $img?: string;
  $showIcon?: boolean;
};
const ImageWrapper = styled.div<TPersonalImg>`
  position: relative;
  width: ${({ width }) => width ?? "40px"};
  height: ${({ height }) => height ?? "40px"};
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
`;
const IconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: -5px;
  z-index: 100;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const PersonalImg = ({
  width,
  height,
  $img,
  $showIcon = false,
}: TPersonalImg) => {
  return (
    <ImageWrapper width={width} height={height}>
      <Image src={$img ?? "/images/profile.jpg"} />
      {$showIcon && (
        <IconWrapper>
          <Icon
            $xposition="center"
            $yposition="center"
            icon="arrowDown"
            size="sm"
            $bg={mainColor}
            $border="2px solid white"
            $borderradius="50%"
            $clickable="true"
            $bghover={hoverColor}
          />
        </IconWrapper>
      )}
    </ImageWrapper>
  );
};

export default PersonalImg;
