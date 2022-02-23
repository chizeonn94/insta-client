import React, { useEffect } from "react";
import styled from "styled-components";

const Outer = styled.div`
  overflow-y: auto;
  background-color: white;
  position: absolute;
  filter: drop-shadow(0px 0px 3px #dbdbdb);
  margin-top:16px;
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 5px;
    bottom: 100%;
    background-color: white;
    -webkit-clip-path: polygon(50% 0, 100% 100%, 0 100%);
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    filter: drop-shadow(0px 0px 3px #dbdbdb);
  },
`;
const PopupCard = ({ children, hideModal, style }) => {
  useEffect(() => {
    if (hideModal) {
      window.addEventListener("click", hideModal);
    }

    return () => {
      window.removeEventListener("click", hideModal);
    };
  }, [hideModal]);

  return (
    <Outer style={style} onClick={(event) => event.stopPropagation()}>
      {children}
    </Outer>
  );
};

export default PopupCard;
