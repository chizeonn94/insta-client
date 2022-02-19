import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import ProfilePopUp from "./profile/ProfilePopUp";
import PostDialog from "./screens/PostDialog";
import SearchBar from "./screens/SearchBar";
import { useDispatch, useSelector } from "react-redux";
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
const NotificationBox = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPostDialog, setOpenPostDialog] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };

  const user = sessionStorage.getItem("user");
  return (
    <div>
      {state.notifications.notifications.map((noti, i) => {
        return (
          <div className={"flex alignCenter"}>
            <div
              onClick={() => navigate(`/profile/${noti.sender.username}`)}
              className={"flex alignCenter"}
            >
              <p
                className={"flex alignCenter radius50 overhidden"}
                style={{ width: 30, height: 30 }}
              >
                <img src={noti.sender.avatar} alt={""} className={"imgFit "} />
              </p>
              <div>
                <p style={{ fontSize: "0.9em" }}>{noti.sender.username}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationBox;
