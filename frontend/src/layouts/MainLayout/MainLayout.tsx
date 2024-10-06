import NavBar from "@components/Common/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div``;
const MainLayout = () => {
  return (
    <Wrapper>
      <NavBar />
      <Outlet />
    </Wrapper>
  );
};

export default MainLayout;
