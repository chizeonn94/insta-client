import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../../App";
import {
  API_URL,
  DEFAULT_IMG,
  FetchWithAuth,
  GetfetchWithAuth,
} from "../../Constants";
import { FollowButton } from "./homeStyle";

const Profile = () => {
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const { state, dispatch } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    userName: "",
    website: "",
    bio: "",
    email: "",
  });
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
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
    await FetchWithAuth(`/followers/${userName}`, "GET").then((res) => {
      console.log("followers//", res);
      setFollowers(res.result.followers);
    });
    await FetchWithAuth(`/following/${userName}`, "GET").then((res) => {
      console.log("following//", res);
      setFollowing(res.result.following);
    });
  };
  useEffect(() => {
    console.log(location);
    FetchWithAuth(`/profile/${userName}`, "GET").then((res) => {
      console.log("profile", res);
      const userData = res.userData;
      setUserInfo(userData);
    });
    FetchWithAuth(`/post/${location.state._id}`, "GET").then((data) => {
      console.log(data);
      setData(data.posts);
    });
    FetchWithAuth(`/followers/${userName}`, "GET").then((res) => {
      console.log(data);
      setFollowers(res.result.followers);
    });
    FetchWithAuth(`/following/${userName}`, "GET").then((res) => {
      console.log(data);
      setFollowing(res.result.following);
    });
    console.log(state);
  }, []);
  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ padding: 10 }}>
        <div className={"flex alignCenter"}>
          <div style={{ paddingRight: 50 }}>
            <p
              style={{ width: 100, height: 100 }}
              className={"overhidden radius50"}
            >
              <img className={"width100"} src={userInfo.photo || DEFAULT_IMG} />
            </p>
            <h4 className={"textCenter"} style={{ paddingTop: 8 }}>
              {userName}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: 50,
              fontSize: "1.1em",
            }}
          >
            <p className={"textCenter"}>
              <b>{data?.length}</b> <br /> posts
            </p>
            <p
              className={"textCenter pointer"}
              onClick={() =>
                navigate(`/followers/${userName}`, {
                  state: { mode: "followers" },
                })
              }
            >
              <b>{followers?.length}</b>
              <br /> followers
            </p>
            <p
              className={"textCenter pointer"}
              onClick={() =>
                navigate(`/followers/${userName}`, {
                  state: { mode: "following" },
                })
              }
            >
              <b>{following?.length}</b>
              <br /> following
            </p>
          </div>
        </div>
        <div>
          {userName == state?.userName && (
            <Button
              fullWidth
              variant={"outlined"}
              onClick={() => {
                navigate("/edit-profile");
              }}
            >
              edit profile
            </Button>
          )}
          {userName !== state?.userName && (
            <FollowButton>
              <b
                onClick={() =>
                  state?.following.includes(location.state._id)
                    ? clickUnfollow(location.state._id)
                    : clickFollow(location.state._id)
                }
              >
                {state && state?.following?.includes(location.state._id)
                  ? "Following"
                  : "Follow"}
              </b>
            </FollowButton>
          )}
          <button onClick={() => logout()}>Log out</button>
        </div>
      </div>

      <div className={"gallery"}>
        {data?.length > 0 &&
          data?.map((post, i) => (
            <p className={"item"} key={`photo-${i}`}>
              <img key={post._id} src={post.photo} />
            </p>
          ))}
      </div>
    </div>
  );
};

export default Profile;
