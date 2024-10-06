import { mainColor } from "@utils/colors";
import styled from "styled-components";
import PreviewImage from "../PreviewImage/PreviewImage";

const ImagesContainer = styled.div<{ $height: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${mainColor};
  gap: 15px;
  height: ${({ $height }) => $height ?? "0"};
  flex-wrap: wrap;
  overflow-y: auto;
  margin: ${({ $height }) => ($height !== "0" ? "10px 5px" : "0")};
  padding: ${({ $height }) => ($height !== "0" ? "20px 0" : "")};
`;
type TUploadedImagesContainer = {
  previews: string[];
  removeImage: (idx: number) => void;
};
const UploadedImagesContainer = ({
  previews,
  removeImage,
}: TUploadedImagesContainer) => {
  previews.sort((a, b) => {
    const A = a.length;
    const B = b.length;
    if (B > A) return 1;
    if (A > B) return -1;
    return 0;
  });
  return (
    <ImagesContainer $height={!previews.length ? "0" : "220px"}>
      {previews &&
        previews.map((preview, idx) => (
          <PreviewImage
            id={idx}
            key={idx}
            imageSrc={preview}
            width={idx !== 0 ? "100px" : "100%"}
            height={idx !== 0 ? "100px" : "300px"}
            closeIconWidth={idx !== 0 ? "20px" : "40px"}
            closeIconHeight={idx !== 0 ? "20px" : "40px"}
            $isCloseIconLarge={idx === 0}
            removeImage={removeImage}
          />
        ))}
    </ImagesContainer>
  );
};

export default UploadedImagesContainer;
