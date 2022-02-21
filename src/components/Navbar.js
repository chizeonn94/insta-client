import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import ProfilePopUp from "./profile/ProfilePopUp";
import PostDialog from "./screens/PostDialog";
import SearchBar from "./screens/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import NotificationBox from "./NotificationBox";
const NavCover = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 5vh;
  display: flex;
  justify-content: space-between;
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
  height: fit-content;
`;
const CustomLink = styled.span`
  font-size: 25px;
  color: black;
  font-size: 24px;
`;
/////////////////////////////////////////
const Navbar = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPostDialog, setOpenPostDialog] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };

  const user = sessionStorage.getItem("token");
  return (
    <NavCover>
      <LogoCover
        onClick={() => navigate(user ? "/" : "/signin")}
        style={{ fontFamily: "Grand Hotel" }}
      >
        Instagram
      </LogoCover>
      <SearchBar />
      <RightButtonsCover>
        <CustomLink to="/chat" onClick={() => setOpenPostDialog(true)}>
          <i className="far fa-plus-square pointer"></i>
        </CustomLink>

        <CustomLink to="/" style={{ position: "relative" }}>
          <NotificationBox />
        </CustomLink>

        <ProfilePopUp onClick={() => alert("hi")} />
        <PostDialog
          openPostDialog={openPostDialog}
          setOpenPostDialog={setOpenPostDialog}
        />
      </RightButtonsCover>
    </NavCover>
  );
};

export default Navbar;
