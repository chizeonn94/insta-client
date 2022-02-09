import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { API_URL, DEFAULT_IMG, GetfetchWithAuth } from "../../Constants";

const Profile = () => {
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

  useEffect(() => {
    GetfetchWithAuth("/myprofile").then((res) => {
      console.log("profile", res);
      const userData = res.userData;
      setUserInfo(userData);
    });
    console.log(state);
    if (sessionStorage.getItem("token")) {
      GetfetchWithAuth(`/mypost`).then((data) => {
        console.log(data);
        setData(data.myPosts);
      });
    }
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
              {userInfo?.userName}
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
              onClick={() => navigate("/followers")}
            >
              <b>40</b>
              <br /> followers
            </p>
            <p
              className={"textCenter pointer"}
              onClick={() => navigate("/followers")}
            >
              <b>40</b>
              <br /> following
            </p>
          </div>
        </div>
        <div>
          <Button
            fullWidth
            variant={"outlined"}
            onClick={() => {
              navigate("/edit-profile");
            }}
          >
            edit profile
          </Button>
          <button onClick={() => logout()}>Log out</button>
        </div>
      </div>

      <div className={"gallery"}>
        {data?.length > 0 &&
          data?.map((post) => (
            <p className={"item"}>
              <img key={post._id} src={post.photo} />
            </p>
          ))}
      </div>
    </div>
  );
};

export default Profile;
