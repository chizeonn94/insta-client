import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchWithAuth } from "../Constants";

/////////////////////////////////////////
const FollowButton = ({ isFollowing, userId }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [followingNow, setFollowingNow] = useState(isFollowing);
  const clickFollow = async () => {
    await FetchWithAuth(`/follow/${userId}`, "PUT").then((res) => {
      if (res.success) {
        setFollowingNow(!followingNow);
      } else {
        alert("failed to follow");
      }
    });
  };
  const clickUnfollow = async () => {
    await FetchWithAuth(`/unfollow/${userId}`, "PUT").then((res) => {
      if (res.success) {
        setFollowingNow(!followingNow);
      } else {
        alert("failed to unfollow");
      }
    });
  };

  return (
    <div>
      {followingNow ? (
        <p onClick={clickUnfollow}>Following</p>
      ) : (
        <p onClick={clickFollow}>Follow</p>
      )}
    </div>
  );
};

export default FollowButton;
