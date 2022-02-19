import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import {
  API_URL,
  API_URL2,
  CLOUD_API,
  DEFAULT_IMG,
  GetfetchWithAuth,
  LOCAL_API,
} from "../../Constants";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PostDialog({ openPostDialog, setOpenPostDialog }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [writingStep, setWritingStep] = useState(false);

  const postDetails = () => {
    let data = new FormData();
    console.log("file", file instanceof File);
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "leah-instagram");

    // if (!title || !body || !file) {
    //   return alert("please add all the fields");
    // }
    fetch(CLOUD_API, {
      method: "POST", // or 'PUT'
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        // alert("success");
        console.log(data);
        await setPhotoUrl(data.url);
        if (data.url) {
          postData(data.url);
        }
      })
      .catch((err) => {
        alert("fail");
        console.log(err);
      });
  };
  const postData = async (url) => {
    // if (!title || !body || !url) {
    //   return alert("please add all the fields");
    // }
    console.log({ title, body, photo: url });
    await fetch(`${LOCAL_API}/createpost`, {
      method: "POST", // or 'PUT'
      //mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ title, body, photo: url }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("successfully posted");
          setFile("");
          setOpenPostDialog(false);
          navigate("/");
        } else {
          return response.json();
        }
      })
      // .then((res) => {
      //   console.log(res);
      //   alert(res.error);
      // })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
  };
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    userName: "",
    website: "",
    bio: "",
    email: "",
    photo: "",
  });
  React.useEffect(() => {
    GetfetchWithAuth("/myprofile").then((res) => {
      console.log("profile", res);
      const userData = res.userData;
      setUserInfo(userData);
    });
  }, []);

  const clickArrow = () => {
    if (!writingStep) {
      setFile("");
      setOpenPostDialog(false);
    } else {
      setWritingStep(false);
    }
  };
  const clickNextShare = () => {
    if (!writingStep) {
      setWritingStep(true);
    } else {
      postDetails();
    }
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        open={openPostDialog}
        onClose={() => setOpenPostDialog(false)}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ArrowBackIcon className={"pointer"} onClick={() => clickArrow()} />

          <span>Create new post</span>

          <p
            className={"pointer"}
            style={{ color: "#0095f6", fontSize: "0.9em" }}
            onClick={clickNextShare}
          >
            {file instanceof File && (
              <span>{writingStep ? "Share" : "Next"}</span>
            )}
          </p>
        </DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          {!writingStep && (
            <img
              src={
                file instanceof File ? URL.createObjectURL(file) : DEFAULT_IMG
              }
              className={"width100 pointer"}
              style={{ width: "100%", display: "block" }}
              onClick={() => document.getElementById("file").click()}
            />
          )}
          <div className="">
            {file instanceof File ? (
              ""
            ) : (
              <label htmlFor="file">Upload image</label>
            )}
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          {writingStep && (
            <div style={{ padding: 15 }}>
              <div className={"flex alignCenter"} style={{ paddingBottom: 12 }}>
                <p
                  className={"radius50 overhidden"}
                  style={{ width: 30, marginRight: 12 }}
                >
                  <img
                    src={userInfo.photo || DEFAULT_IMG}
                    alt={""}
                    style={{
                      height: 30,
                      borderRadius: "50%",
                    }}
                    className={"width100"}
                  />
                </p>

                <span>{userInfo.userName}</span>
              </div>
              <div>
                <textarea
                  placeholder={"Write a caption..."}
                  className={"width100 borderNone"}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
