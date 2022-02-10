import { Button, Card } from "@mui/material";
import styled from "styled-components";

export const LoginCard = styled(Card)`
  margin-top: ${({ top, bottom }) => (top ? "10%" : bottom ? "10px" : "")};
  width: 400px;
  padding: 40px;
  box-shadow: none !important;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  text-align: center;
`;

export const RootContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const MainTitle = styled.p`
  font-size: 3rem;
  text-align: center;
  font-family: "Grand Hotel";
`;

export const CustomButton = styled(Button)`
  margin: ${({ margin }) => (margin ? margin : "")};
`;

export const SubTitle = styled.p`
  font-size: 1em;
  text-align: center;
  font-weight: 600;
  color: rgba(142, 142, 142);
  padding: 20px 0 10px;
`;
