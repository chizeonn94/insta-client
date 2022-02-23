import { makeStyles } from "@mui/styles";
import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  API_URL,
  API_URL2,
  CLOUD_API,
  DEFAULT_IMG,
  GetfetchWithAuth,
  LOCAL_API,
} from "../../Constants";
import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles({
  fieldName: {
    width: "30%",
    textAlign: "right",
    paddingRight: 12,
    fontWeight: "bold",
  },
  inputDiv: { width: "70%", textAlign: "left" },
  inputField: { width: "100%" },
});
const EditProfile = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    userName: "",
    website: "",
    bio: "",
    email: "",
  });

  const [file, setFile] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    GetfetchWithAuth("/myprofile").then((res) => {
      console.log("profile", res);
      const userData = res.userData;
      setUserInfo(userData);
    });
  }, []);
  const submitHandler = () => {
    if (file instanceof File) {
      postDetails();
    } else {
      postData();
    }
  };
  const postDetails = () => {
    let data = new FormData();
    //console.log("file", file instanceof File);
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "leah-instagram");

    if (!userInfo.fullName || !userInfo.userName || !userInfo.email) {
      return alert("please add all the fields");
    }
    fetch(CLOUD_API, {
      method: "POST", // or 'PUT'
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        alert("success");
        console.log(data.url);
        if (data.url) {
          postData(data.url);
        }
      })
      .catch((err) => {
        alert("fail!");
        console.log(err);
      });
  };
  const postData = (photoUrl) => {
    fetch(`${LOCAL_API}/profile`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        ...userInfo,
        photo: photoUrl || userInfo.photo,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        console.log(res);

        alert(res.message);

        dispatch({ type: "USER", payload: res.newUser });
      })
      .catch((error) => {
        alert("error", error);
        console.log("Error:", error);
      });
  };
  const changeInput = (el) => {
    const { name, value } = el.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: 500,
        padding: 20,
        textAlign: "center",
      }}
    >
      <div className={"flex alignCenter bottom12"}>
        <div
          className={classes.fieldName}
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          <p
            style={{ width: 50, height: 50 }}
            className={"radius50 overhidden"}
          >
            <img
              className={"imgFit"}
              src={
                file instanceof File
                  ? URL.createObjectURL(file)
                  : userInfo.photo || DEFAULT_IMG
              }
              onClick={() => document.getElementById("file").click()}
            />
          </p>
        </div>
        <div>
          <p style={{ fontSize: "1.2em", textAlign: "left" }}>
            <b>{userInfo.userName}</b>
          </p>
          <label htmlFor="file" className={"pointer"}>
            <b style={{ color: "#0095f6", fontSize: "0.9em" }}>
              Change profile photo
            </b>
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className={"none"}
          />
        </div>
      </div>

      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}>Name</p>
        <div className={classes.inputDiv}>
          <TextField
            size={"small"}
            type="text"
            placeholder="full name"
            name="fullName"
            value={userInfo.fullName || ""}
            onChange={changeInput}
            className={classes.inputField}
          />
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}></p>
        <div className={classes.inputDiv}>
          Help people discover your account by using the name that you're known
          by: either your full name, nickname or business name. You can only
          change your name twice within 14 days.
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}>Username</p>
        <div className={classes.inputDiv}>
          <TextField
            size={"small"}
            type="text"
            placeholder="user name"
            name="userName"
            value={userInfo.userName || ""}
            onChange={changeInput}
            className={classes.inputField}
          />
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}></p>
        <div className={classes.inputDiv}>
          In most cases, you'll be able to change your username back to
          chizeon_lea for another 14 days. Learn more
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}>Website</p>
        <div className={classes.inputDiv}>
          <TextField
            size={"small"}
            type="text"
            placeholder="website"
            name="website"
            value={userInfo.website || ""}
            onChange={changeInput}
            className={classes.inputField}
          />
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}>Bio</p>
        <div className={classes.inputDiv}>
          <TextField
            size={"small"}
            type="text"
            placeholder="bio"
            name="bio"
            value={userInfo.bio || ""}
            onChange={changeInput}
            className={classes.inputField}
          />
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}>Email address</p>
        <div className={classes.inputDiv}>
          <TextField
            size={"small"}
            type="text"
            placeholder="email"
            name="email"
            value={userInfo.email || ""}
            onChange={changeInput}
            className={classes.inputField}
          />
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}></p>
        <div className={classes.inputDiv}>
          Personal information Provide your personal information, even if the
          account is used for a business, pet or something else. This won't be
          part of your public profile.
        </div>
      </div>
      <div className={"flex alignCenter bottom12"}>
        <p className={classes.fieldName}>Phone number</p>
        <div className={classes.inputDiv}>
          <TextField
            size={"small"}
            type="text"
            placeholder="email"
            name="email"
            value={userInfo.email || ""}
            onChange={changeInput}
            className={classes.inputField}
          />
        </div>
      </div>

      <div className="file-field input-field">
        <p>
          <Button
            variant={"contained"}
            className="btn waves-effect waves-light"
            onClick={submitHandler}
          >
            Submit Post
          </Button>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
