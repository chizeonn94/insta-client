import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import ProfilePopUp from "./profile/ProfilePopUp";
import PostDialog from "./screens/PostDialog";
import SearchBar from "./screens/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import NotificationBox from "./NotificationBox";
const NavCoverOuter = styled.div`
  border-bottom: 1px solid #dbdbdb;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
`;
const NavCover = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
const LogoCover = styled.h1`
  font-size: 30px;
  font-family: "Grand Hotel";
  font-weight: normal;
`;
const RightButtonsCover = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: fit-content;
  margin-right: -20px;
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
    <NavCoverOuter>
      <NavCover>
        <LogoCover
          onClick={() => navigate(user ? "/" : "/signin")}
          style={{ fontFamily: "Grand Hotel", cursor: "pointer" }}
        >
          Instagram
        </LogoCover>
        <SearchBar />
        <RightButtonsCover>
          <CustomLink onClick={() => setOpenPostDialog(true)}>
            <i className="far fa-plus-square pointer"></i>
          </CustomLink>
          <CustomLink style={{ position: "relative" }}>
            <NotificationBox />
          </CustomLink>

          <ProfilePopUp onClick={() => alert("hi")} />
          <PostDialog
            openPostDialog={openPostDialog}
            setOpenPostDialog={setOpenPostDialog}
          />
        </RightButtonsCover>
      </NavCover>
    </NavCoverOuter>
  );
};

export default Navbar;
