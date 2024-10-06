import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import Icon, { TIcons } from "@components/Common/Icon/Icon";
import PersonalImg from "@components/Posts/components/PersonalImg/PersonalImg";
import { useAddNewPost } from "@hooks/apis/useAddNewPost";
import { hoverColor } from "@utils/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useUploadImages from "@hooks/useUploadImages";
import UploadedImagesContainer from "@components/Posts/components/UploadedImagesContainer/UploadedImagesContainer";
import { useRef } from "react";
const Name = styled.p`
  margin: 0;
  font-weight: bold;
`;
const TextInput = styled.textarea`
  margin: 10px 0;
  width: 100%;
  height: 80px;
  border: none;
  font-size: 18px;
  outline: none; /* Remove the default outline on focus */
  &::placeholder {
    font-size: 18px;
  }
  &:focus {
    border: none; /* Remove the border on focus */
  }
`;
const IconsWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px;
`;
const SubmitButton = styled.button`
  width: 100%;
  font-size: 18px;
  color: white;
  background-color: #1877f2;
  border: 0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0 0;
  cursor: pointer;
`;
const icons = [
  { icon: "image", color: "#45BD62" },
  { icon: "userTag", color: "#1877F2" },
  { icon: "smile", color: "#F7B928" },
  { icon: "locationDot", color: "#F5533D" },
  { icon: "ellipsis", color: "gray" },
];
type Inputs = {
  text: string;
  images: string[];
};
const AddPostForm = () => {
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video element
  const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to the canvas element
  const {
    ref,
    files,
    previews,
    handleFileChange,
    handlechooseImages,
    removeImage,
  } = useUploadImages();
  // } = useUploadImages({ videoRef, canvasRef });
  const { mutate, isLoading } = useAddNewPost("66e300c7b792400505dbb647");
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("userId", "66e300c7b792400505dbb647");
    formData.append("folder", "facebook/anas/posts/66e300c7b792400505dbb647");
    formData.append("text", data.text);
    files.forEach((image) => {
      formData.append("images", image);
    });
    mutate(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexWrapper $xposition="start" $yposition="center" $gap="10px">
        <PersonalImg />
        <Name>Anas Attar</Name>
      </FlexWrapper>
      <TextInput
        placeholder="Anas , What do you Think ? "
        {...register("text")}
      />
      {/* Hidden video element for loading and processing the video */}
      <video ref={videoRef} style={{ display: "none" }}></video>

      {/* Hidden canvas element used to capture the video frame */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <UploadedImagesContainer previews={previews} removeImage={removeImage} />
      <IconsWrapper>
        <FlexWrapper $xposition="space-between" $yposition="center">
          <h4 style={{ margin: "0" }}>Add To Your Post</h4>
          <FlexWrapper
            $xposition="space-between"
            $yposition="center"
            width="60%"
          >
            {icons.map((i, idx) => (
              <Icon
                key={idx}
                icon={i.icon as TIcons}
                color={i.color}
                size="lg"
                $xposition="center"
                $yposition="center"
                $borderradius="50%"
                $bghover={hoverColor}
                $clickable="true"
                width="40px"
                height="40px"
                onclick={handlechooseImages}
              />
            ))}
          </FlexWrapper>
        </FlexWrapper>
      </IconsWrapper>
      <SubmitButton disabled={isLoading}>Post</SubmitButton>
      <input
        type="file"
        hidden
        ref={ref}
        multiple
        accept="image/*|video/*"
        onChange={handleFileChange}
      />
    </form>
  );
};

export default AddPostForm;
