import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { API_URL, DEFAULT_IMG, GetfetchWithAuth } from "../../Constants";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    console.log(state);
    if (sessionStorage.getItem("token")) {
      GetfetchWithAuth(`/mypost`).then((data) => {
        console.log(data);
        setData(data.myPosts);
      });
      GetfetchWithAuth(`/myprofile`).then((data) => {
        console.log(data);
        setProfilePic(data.userData.photo);
      });
    }
  }, []);
  return (
    <div style={{ maxWidth: 550, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: 160, height: 160, borderRadius: "50%" }}
            src={profilePic || DEFAULT_IMG}
          />
        </div>
        <div>
          <h4>{state?.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108 %",
            }}
          >
            <h5>{data?.length}posts</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
          </div>
          <button
            onClick={() => {
              navigate("/edit-profile");
            }}
          >
            edit profile
          </button>
        </div>
      </div>
      <div className={"gallery"}>
        {data?.length > 0 &&
          data?.map((post) => (
            <img key={post._id} className={"item"} src={post.photo} />
          ))}
      </div>
    </div>
  );
};

export default Profile;
