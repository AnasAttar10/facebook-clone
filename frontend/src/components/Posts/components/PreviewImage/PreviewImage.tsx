import Icon from "@components/Common/Icon/Icon";
import { hoverColor } from "@utils/colors";
import styled from "styled-components";
type TPreviewImage = {
  id: number;
  imageSrc: string;
  width?: string;
  height?: string;
  closeIconWidth?: string;
  closeIconHeight?: string;
  $isCloseIconLarge: boolean;
  removeImage: (idx: number) => void;
};
const ImgWrapper = styled.div<{ width?: string; height?: string }>`
  max-width: ${({ width }) => width ?? "300px"};
  max-height: ${({ height }) => height ?? "300px"};
  position: relative;
  border-radius: 10px;
`;

const PreviewImageEl = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: block;
  margin: 10px auto;
  border-radius: 5px;
`;
const CloseIconWrapper = styled.div<{ $isCloseIconLarge: boolean }>`
  position: absolute;
  top: ${({ $isCloseIconLarge }) => ($isCloseIconLarge ? "-5px" : "5px")};
  left: 0;
`;

const PreviewImage = ({
  id,
  imageSrc,
  width,
  height,
  closeIconWidth,
  closeIconHeight,
  $isCloseIconLarge,
  removeImage,
}: TPreviewImage) => {
  return (
    <ImgWrapper width={width} height={height}>
      <CloseIconWrapper
        $isCloseIconLarge={$isCloseIconLarge}
        onClick={() => removeImage(id)}
      >
        <Icon
          icon="close"
          size={$isCloseIconLarge ? "lg" : "sm"}
          width={closeIconWidth ?? "40px"}
          height={closeIconHeight ?? "40px"}
          $xposition="center"
          $yposition="center"
          $borderradius="50%"
          color="gray"
          $clickable="true"
          $bghover={hoverColor}
        />
      </CloseIconWrapper>
      <PreviewImageEl src={imageSrc} alt="Selected Image" />
    </ImgWrapper>
  );
};

export default PreviewImage;
