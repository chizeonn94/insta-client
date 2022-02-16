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
import UserListSkeleton from "./UserListSkeleton";

const Likes = () => {
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const clickFollow = async (_id) => {
    //alert("follow");
    await FetchWithAuth(`/follow/${_id}`, "PUT").then((res) => {
      console.log("hh", res);
      dispatch({
        type: "UPDATE",
        payload: { following: res.result.myData.following },
      });
      const user = JSON.parse(sessionStorage.getItem("user"));

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          following: res.result.myData.following,
        })
      );
    });
  };
  const clickUnfollow = async (_id) => {
    //alert("unfollow");
    await FetchWithAuth(`/unfollow/${_id}`, "PUT").then((res) => {
      dispatch({
        type: "UPDATE",
        payload: { following: res.result.myData.following },
      });
      const user = JSON.parse(sessionStorage.getItem("user"));

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          following: res.result.myData.following,
        })
      );
    });
  };
  const renderUsers = (users) =>
    users.map((user, i) => {
      return (
        <UserListSkeleton
          key={user._id}
          userName={user.userName}
          user={user}
          isFollowing={user.isFollowing}
        />
      );
    });

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <p className={"textCenter padding12"}>
        <b>Likes</b>
      </p>

      <div style={{ padding: 10 }}>
        <TextField fullWidth size={"small"} placeholder={"search"} />
        <div>{renderUsers(location.state.likes)}</div>
      </div>
    </div>
  );
};

export default Likes;
