import styled from "styled-components";
import PersonalImg from "../components/PersonalImg/PersonalImg";
import FlexWrapper from "@components/Common/FlexWrapper/FlexWrapper";
import { boxShadow4Sides, hoverColor } from "@utils/colors";
import Icon, { TIcons } from "@components/Common/Icon/Icon";
import Divider from "../components/Divider/Divider";
import Modal from "@components/Common/Modal/Modal";
import { useState } from "react";
import AddPostForm from "@components/forms/AddPostForm";
const Wrapper = styled.div`
  width: 30%;
  padding: 10px;
  box-shadow: ${boxShadow4Sides};
  margin: 10px auto 20px;
`;
const Input = styled.p`
  background-color: #f0f2f5;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  outline: none;
  font-size: 16px;
  color: gray;
  width: 74%;
  margin: 0;
  cursor: pointer;
`;

const icons2 = [
  { icon: "liveVideo", color: "#E42645", text: "Live video" },
  { icon: "image", color: "#41B35D", text: "Image/video" },
  { icon: "smile", color: "#F7B928", text: "Feeling/activity" },
];
const AddPost = () => {
  const [isModalOpend, setIsModalOpend] = useState(false);

  const openModal = () => {
    setIsModalOpend(true);
  };

  return (
    <>
      <Modal
        title={"Add Post"}
        $isopen={isModalOpend}
        onClose={() => setIsModalOpend(false)}
      >
        <AddPostForm />
      </Modal>
      <Wrapper>
        <FlexWrapper $xposition="space-between" $yposition="center" $gap="5px">
          <PersonalImg />
          <Input onClick={openModal}>What do you Think ? </Input>
        </FlexWrapper>
        <Divider />
        <FlexWrapper $xposition="space-between">
          {icons2.map((i, idx) => (
            <Icon
              key={idx}
              icon={i.icon as TIcons}
              color={i.color}
              size="lg"
              width="33.3%"
              $bghover={hoverColor}
              text={i.text}
              $xposition="center"
              $yposition="center"
              height="40px"
              $borderradius="10px"
              $gap="5px"
              $clickable={"true"}
              onclick={openModal}
            />
          ))}
        </FlexWrapper>
      </Wrapper>
    </>
  );
};

export default AddPost;
