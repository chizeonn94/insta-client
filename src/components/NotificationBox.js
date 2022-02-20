import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FollowButton from "./FollowButton";
import { Menu } from "@mui/material";
import NotificationBubble from "./NotificationBubble";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    alert("click");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderType = (type) => {
    switch (type) {
      case "like":
        return "liked your photo";
      case "follow":
        return "started following you";
      case "comment":
        return "commented:";
      default:
        return;
    }
  };

  return (
    <div>
      <span onClick={handleClick}>
        <i className="far fa-heart pointer"></i>
      </span>
      {state?.notifications?.unreadCount > 0 && <p className={"underDot"} />}
      <NotificationBubble />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {state?.notifications?.notifications.map((noti, i) => {
          return (
            <div
              key={`notification-${i}`}
              className={"flex alignCenter"}
              style={{ padding: 10 }}
            >
              <div
                onClick={() => navigate(`/profile/${noti.sender.userName}`)}
                className={"flex alignCenter pointer"}
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <p
                  className={"radius50 overhidden"}
                  style={{ width: 30, height: 30, border: "1px solid green" }}
                >
                  <img src={noti.sender.photo} alt={""} className={"imgFit"} />
                </p>
                <div>
                  <p style={{ fontSize: "0.9em" }}>{noti.sender.userName}</p>
                  <p style={{ fontSize: "0.9em" }}>
                    {renderType(noti.notificationType)}
                    {noti.notificationData?.comment}
                  </p>
                </div>
              </div>
              <div>
                {noti.notificationType === "comment" ||
                noti.notificationType === "like" ? (
                  <p className={"overhidden"} style={{ width: 60, height: 80 }}>
                    <img
                      src={noti.notificationData.photo}
                      alt={""}
                      className={"imgFit"}
                    />
                  </p>
                ) : (
                  ""
                )}

                {noti.notificationType === "follow" && (
                  <FollowButton
                    isFollowing={noti.isFollowing}
                    userId={noti.sender._id}
                  />
                )}
              </div>
            </div>
          );
        })}
      </Menu>
    </div>
  );
};

export default NotificationBox;
