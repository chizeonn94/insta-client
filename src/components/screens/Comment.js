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

const Comment = () => {
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const { state, dispatch } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [selectedMode, setSelectedMode] = useState(location.state.mode);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    console.log(state);
    // console.log(selectedMode);
    if (sessionStorage.getItem("token")) {
      GetfetchWithAuth(`/followers/${userName}`).then((res) => {
        console.log("followers", res);
        setFollowers(res.result.followers);
      });
      GetfetchWithAuth(`/following/${userName}`).then((res) => {
        console.log("following", res);
        setFollowing(res.result.following);
      });
    }
  }, []);

  useEffect(() => {
    if (selectedMode === "followers") {
      setSelectedData(followers);
    } else {
      setSelectedData(following);
    }
  }, [selectedMode]);
  // useEffect(() => {
  //   console.log("followers!1", followers);
  //   console.log("following!!", following);
  // }, [followers, following]);
  const clickFollow = async (_id) => {
    alert("follow");
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
    await FetchWithAuth(`/followers/${userName}`, "GET").then((res) => {
      console.log("followers==", res);

      setFollowers(res.result.followers);
    });
    await FetchWithAuth(`/following/${userName}`, "GET").then((res) => {
      console.log("following==", res);
      setFollowing(res.result.following);
    });
  };
  const clickUnfollow = async (_id) => {
    alert("unfollow");
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
        <b>{userName}</b>
      </p>
      <div className={"flex alignCenter"}>
        <p
          className={"textCenter width50 padding12 bold pointer"}
          style={
            selectedMode == "followers"
              ? { borderBottom: "1px solid #333" }
              : { borderBottom: "1px solid #ccc" }
          }
          onClick={() => setSelectedMode("followers")}
        >
          {followers?.length}&nbsp;followers
        </p>
        <p
          className={"textCenter width50 padding12 bold pointer"}
          style={
            selectedMode == "following"
              ? { borderBottom: "1px solid #333" }
              : { borderBottom: "1px solid #ccc" }
          }
          onClick={() => setSelectedMode("following")}
        >
          {following?.length}&nbsp;following
        </p>
      </div>

      <div style={{ padding: 10 }}>
        <TextField fullWidth size={"small"} placeholder={"search"} />
        <p style={{ padding: "20px 0" }}>
          <b>All Followers</b>
        </p>
        <div>
          {selectedMode === "followers" && renderUsers(followers)}
          {selectedMode === "following" && renderUsers(following)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
