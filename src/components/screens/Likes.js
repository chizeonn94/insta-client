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
  const renderUsers = (datas) =>
    datas.map((data, i) => {
      return (
        <div key={data._id} className={"flex alignCenter spacebt"}>
          <div className={"flex alignCenter"}>
            <p
              className={"overhidden radius50 pointer"}
              style={{ width: 50, height: 50, marginRight: 12 }}
              onClick={() =>
                navigate(`/profile/${data.userName}`, {
                  state: { _id: data._id },
                })
              }
            >
              <img
                src={data.photo}
                alt={"follower profile pic"}
                className={"imgFit"}
              />
            </p>
            <div
              className={"pointer"}
              onClick={() =>
                navigate(`/profile/${data.userName}`, {
                  state: { _id: data._id },
                })
              }
            >
              <p>
                <b>{data.userName}</b>
              </p>
              <p
                className={"lightGray"}
                style={{ fontSize: "0.9em", paddingTop: 4 }}
              >
                {data.fullName}
              </p>
            </div>
          </div>
          <FollowButton
            onClick={() =>
              state?.following.includes(data._id)
                ? clickUnfollow(data._id)
                : clickFollow(data._id)
            }
          >
            <b>
              {state && state?.following?.includes(data._id)
                ? "Following"
                : "Follow"}
            </b>
          </FollowButton>
        </div>
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
