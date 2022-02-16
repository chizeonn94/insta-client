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
import { FollowButton } from "./homeStyle";

const UserListSkeleton = ({ user, isFollowing }) => {
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
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
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
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
              src={user.photo}
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
        {user._id !== state._id && (
          <FollowButton
            onClick={() =>
              following ? clickUnfollow(user._id) : clickFollow(user._id)
            }
          >
            <b>{following ? "Following" : "Follow"}</b>
          </FollowButton>
        )}
      </div>
    </div>
  );
};

export default UserListSkeleton;
