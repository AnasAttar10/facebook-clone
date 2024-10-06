import React from "react";
import ReactDOM from "react-dom";
import Divider from "@components/Posts/components/Divider/Divider";
import { mainColor } from "@utils/colors";
import styled from "styled-components";

interface ModalProps {
  title?: string;
  $isopen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  $showCloseIcon?: boolean;
}
const Heading = styled.h2`
  margin: 10px 0;
  text-align: center;
`;
const ModalOverlay = styled.div<{ $isopen: boolean }>`
  display: ${({ $isopen }) => ($isopen ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 10px;
  width: 30%;
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  background-color: ${mainColor};
  color: gray;
  border: none;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({
  title = "",
  $isopen,
  onClose,
  children,
  $showCloseIcon,
}) => {
  const modalRoot = document.getElementById("modal") as HTMLElement;

  return ReactDOM.createPortal(
    <ModalOverlay $isopen={$isopen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {$showCloseIcon && <CloseButton onClick={onClose}>&times;</CloseButton>}
        {title && <Heading>{title}</Heading>}
        {title && <Divider />}
        {children}
      </ModalContent>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
