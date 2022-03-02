import { ClassNames } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import {
  API_URL,
  DEFAULT_IMG,
  FetchWithAuth,
  GetfetchWithAuth,
} from "../../Constants";
import { useLocation } from "react-router-dom";
import { FollowBtnStyle } from "./homeStyle";
import { useDispatch, useSelector } from "react-redux";

const UserListSkeleton = ({ user, isFollowing }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  const [following, setFollowing] = useState(isFollowing);
  const clickFollow = async (_id) => {
    await FetchWithAuth(`/follow/${_id}`, "PUT").then((res) => {
      if (res.success) {
        setFollowing(!following);
      } else {
        alert("failed to follow");
      }
    });
  };
  const clickUnfollow = async (_id) => {
    await FetchWithAuth(`/unfollow/${_id}`, "PUT").then((res) => {
      if (res.success) {
        setFollowing(!following);
      } else {
        alert("failed to unfollow");
      }
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto 16px" }}>
      <div className={"flex alignCenter spacebt"}>
        <div className={"flex alignCenter"}>
          <p
            className={"overhidden radius50 pointer"}
            style={{ width: 50, height: 50, marginRight: 12 }}
            onClick={() =>
              navigate(`/profile/${user.userName}`, {
                state: { _id: user._id },
              })
            }
          >
            <img
              src={user?.photo || DEFAULT_IMG}
              alt={"follower profile pic"}
              className={"imgFit"}
            />
          </p>
          <div
            className={"pointer"}
            onClick={() =>
              navigate(`/profile/${user.userName}`, {
                state: { _id: user._id },
              })
            }
          >
            <p>
              <b>{user.userName}</b>
            </p>
            <p
              className={"lightGray"}
              style={{ fontSize: "0.9em", paddingTop: 4 }}
            >
              {user.fullName}
            </p>
          </div>
        </div>
        {user._id !== state?.user?._id && (
          <FollowBtnStyle
            isFollowing={following}
            onClick={() =>
              following ? clickUnfollow(user._id) : clickFollow(user._id)
            }
          >
            {following ? "Following" : "Follow"}
          </FollowBtnStyle>
        )}
      </div>
    </div>
  );
};

export default UserListSkeleton;
