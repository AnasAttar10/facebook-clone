import styled from "styled-components";
import Center from "./components/Center";
import RightSide from "./components/RightSide";
import LeftSide from "./components/LeftSide";
import { boxShadow } from "@utils/colors";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  box-shadow: ${boxShadow};
`;
const NavBar = () => {
  return (
    <Wrapper>
      <LeftSide />
      <Center />
      <RightSide />
    </Wrapper>
  );
};

export default NavBar;
