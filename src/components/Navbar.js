import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import { Avatar } from "@mui/material";
const NavCover = styled.div`
  width: 100%;
  min-height: 5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #aaa;
`;
const LogoCover = styled.div`
  font-size: 45px;
  font-family: "Grand Hotel";
`;
const RightButtonsCover = styled.div`
  display: flex;
  align-items: center;
  gap: 10%;
`;
const CustomLink = styled(Link)`
  font-size: 18px;
  color: black;
  font-size: 24px;
`;
/////////////////////////////////////////
const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };
  const user = sessionStorage.getItem("user");
  return (
    <NavCover>
      <LogoCover
        onClick={() => navigate(user ? "/" : "/signin")}
        style={{ fontFamily: "Grand Hotel" }}
      >
        Instagram
      </LogoCover>
      <RightButtonsCover>
        <CustomLink to="/">
          <i class="fas fa-home"></i>
        </CustomLink>
        <CustomLink to="/chat">
          <i class="fab fa-telegram-plane"></i>
        </CustomLink>
        <CustomLink to="/create">
          <i class="far fa-plus-square"></i>
        </CustomLink>
        <CustomLink to="/">
          <i class="far fa-compass"></i>
        </CustomLink>
        <CustomLink to="/">
          <i class="far fa-heart"></i>
        </CustomLink>
        <CustomLink to="/profile">
          <Avatar sx={{ width: 24, height: 24 }} />
        </CustomLink>
      </RightButtonsCover>
    </NavCover>
  );
};

export default Navbar;
