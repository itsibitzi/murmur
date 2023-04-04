import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  back: () => void;
  children: ReactNode;
};

const ModalDimmer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background: rgba(0, 0, 0, 0.15);
  flex-direction: column;
`;

const ModalPanel = styled.div`
  width: 400px;
  height: 400px;
`;

export const Modal: FC<ModalProps> = ({ back, children }) => {
  return createPortal(
    <ModalDimmer onClick={back}>
      <ModalPanel onClick={(e) => e.stopPropagation()}>{children}</ModalPanel>
    </ModalDimmer>,
    document.querySelector("#overlays")!
  );
};
