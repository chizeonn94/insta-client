import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const userName = location.pathname.split("/")[2];

  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log(location);
    FetchWithAuth(`/profile/${userName}`, "GET").then((res) => {
      console.log("profile", res);
      const userData = res.userInfo;
      setUserInfo(userData);
      setIsFollowing(userData.isFollowing);
    });
    FetchWithAuth(`/usersposts/${userName}`, "GET").then((data) => {
      console.log("sgsgs", data);
      setData(data.posts);
    });
    FetchWithAuth(`/followers/${userName}`, "GET").then((res) => {
      console.log(res);
      setFollowers(res.result.followers);
    });
    FetchWithAuth(`/following/${userName}`, "GET").then((res) => {
      console.log(res);
      setFollowing(res.result.following);
    });
    console.log(state);
  }, []);
  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };
  const handleClick = () => {
    const followOrUnfollow = isFollowing ? "unfollow" : "follow";
    alert(followOrUnfollow);
    FetchWithAuth(`/${followOrUnfollow}/${userInfo?._id}`, "PUT").then(
      (res) => {
        if (res.success) {
          setIsFollowing(!isFollowing);
          if (followOrUnfollow == "follow") {
            let followers = userInfo.followers;
            setUserInfo({
              ...userInfo,
              followers: followers.push(state?.user?._id),
            });
          } else {
            let followers = userInfo.followers;
            followers.indexOf(state?.user?._id) !== -1 &&
              followers.splice(followers.indexOf(state?.user?._id), 1);
            setUserInfo({ ...userInfo, followers: followers });
          }
          console.log(userInfo);
        } else {
          alert(`failed to ${followOrUnfollow}`);
        }
      }
    );
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
              <img className={"imgFit"} src={userInfo?.photo || DEFAULT_IMG} />
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
              <b>{userInfo?.followers ? userInfo?.followers?.length : 0}</b>
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
              <b>{userInfo?.following ? userInfo?.following?.length : 0}</b>
              <br /> following
            </p>
          </div>
        </div>
        <div>
          {userName == state?.user.userName && (
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
          {userName !== state?.user.userName && (
            <FollowButton>
              <b onClick={handleClick}>
                {isFollowing ? "Following" : "Follow"}
              </b>
            </FollowButton>
          )}
        </div>
      </div>

      <div className={"gallery"}>
        {data?.length > 0 &&
          data?.map((post, i) => (
            <p
              className={"item pointer"}
              key={`photo-${i}`}
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <img key={post._id} src={post.photo} />
            </p>
          ))}
      </div>
    </div>
  );
};

export default Profile;
