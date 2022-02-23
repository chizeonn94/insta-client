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
import PopupCard from "./screens/PopupCard";
const style = {
  width: 350,
  maxHeight: "80vh",
  left: "50%",
  transform: "translate(-50%, 0)",
  background: " white",
  filter: "drop-shadow(0px 0px 3px #dbdbdb)",
};

/////////////////////////////////////////
const NotificationBox = ({ readNotification }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [followNotiNum, setFollowNotiNum] = useState(0);
  const [likeNotiNum, setLikeNotiNum] = useState(0);
  const [commentNotiNum, setCommentNotiNum] = useState(0);

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
      <span
        onClick={(e) => {
          setOpen(true);
          e.stopPropagation();
        }}
      >
        <i className="fa-solid fa-heart pointer"></i>
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
      {open && (
        <PopupCard hideModal={() => setOpen(false)} style={style}>
          <div>
            {state?.notifications?.notifications.map((noti, i) => {
              return (
                <div
                  key={`notification-${i}`}
                  className={"flex alignCenter"}
                  style={{
                    padding: 10,
                    justifyContent: "space-between",
                    fontSize: "0.7em",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div
                    onClick={() => navigate(`/profile/${noti.sender.userName}`)}
                    className={"flex alignCenter pointer"}
                  >
                    <p
                      className={"radius50 overhidden"}
                      style={{
                        width: 30,
                        height: 30,
                        border: "1px solid #ddd",
                        marginRight: 12,
                      }}
                    >
                      <img
                        src={noti.sender.photo}
                        alt={""}
                        className={"imgFit"}
                      />
                    </p>
                    <div>
                      <p style={{ fontSize: "0.9em" }}>
                        <b>{noti.sender.userName}</b>
                      </p>
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
                        className={"overhidden pointer"}
                        style={{ width: 60, height: 60 }}
                        onClick={() =>
                          navigate(`/post/${noti.notificationData.postId}`)
                        }
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
          </div>
        </PopupCard>
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsStart: (token) => dispatch(fetchNotificationsStart(token)),
  readNotification: (token) => dispatch(readNotification(token)),
});
export default connect(null, mapDispatchToProps)(NotificationBox);
