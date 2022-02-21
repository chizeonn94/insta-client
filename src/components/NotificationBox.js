import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import { connect, useDispatch, useSelector } from "react-redux";
import FollowButton from "./FollowButton";
import { Menu } from "@mui/material";
import NotificationBubble from "./NotificationBubble";
import notificationTypes from "../actionTypes/notificationTypes";
import { FetchWithAuth, LOCAL_API } from "../Constants";
import {
  fetchNotificationsStart,
  readNotification,
} from "../actions/notificationActions";
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
const NotificationBox = ({ readNotification }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [followNotiNum, setFollowNotiNum] = useState(0);
  const [likeNotiNum, setLikeNotiNum] = useState(0);
  const [commentNotiNum, setCommentNotiNum] = useState(0);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    readNotification();
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
  useEffect(() => {
    let follow = 0;
    let like = 0;
    let comment = 0;

    state?.notifications?.notifications.forEach((noti) => {
      if (!noti.read) {
        switch (noti.notificationType) {
          case "follow":
            follow += 1;
            break;
          case "like":
            like += 1;
            break;
          case "comment":
            comment += 1;
            break;
          default:
            follow += 1;
            break;
        }
      }
    });
    setFollowNotiNum(follow);
    setLikeNotiNum(like);
    setCommentNotiNum(comment);
  }, [state?.notifications]);
  return (
    <div style={{ position: "relative" }}>
      <span onClick={handleClick}>
        <i class="fa-solid fa-heart"></i>
      </span>
      {state?.notifications?.unreadCount > 0 && (
        <>
          <p className={"underDot"} />{" "}
          <NotificationBubble
            follow={followNotiNum}
            like={likeNotiNum}
            comment={commentNotiNum}
          />
        </>
      )}

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translate(-50%,0)",
        }}
      >
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            // elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 0px 3px #dbdbdb)",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                top: 55,
              },
              "& .MuiPaper-root": {
                top: 112,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: "92%",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
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
                    <img
                      src={noti.sender.photo}
                      alt={""}
                      className={"imgFit"}
                    />
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
                    <p
                      className={"overhidden"}
                      style={{ width: 60, height: 80 }}
                    >
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
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsStart: (token) => dispatch(fetchNotificationsStart(token)),
  readNotification: (token) => dispatch(readNotification(token)),
});
export default connect(null, mapDispatchToProps)(NotificationBox);
