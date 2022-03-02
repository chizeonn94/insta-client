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
import { useDispatch, useSelector } from "react-redux";

const Likes = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();

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
    <div style={{ maxWidth: 600, margin: "0 auto 16px" }}>
      <p className={"textCenter padding12"}>
        <b>Likes</b>
      </p>

      <div style={{ padding: 10 }}>
        {/* <TextField fullWidth size={"small"} placeholder={"search"} /> */}
        <div>{renderUsers(location.state.likes)}</div>
      </div>
    </div>
  );
};

export default Likes;
