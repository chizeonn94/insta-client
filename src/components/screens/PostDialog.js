import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import {
  API_URL,
  CLOUD_API,
  DEFAULT_IMG,
  GetfetchWithAuth,
} from "../../Constants";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";

const UploadBtn = styled.label`
  padding: 10px 20px;
  color: white;
  background-color: rgba(0, 149, 246);
  cursor: pointer;
  border-radius: 4px;
`;
export default function PostDialog({ openPostDialog, setOpenPostDialog }) {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [writingStep, setWritingStep] = useState(false);

  const postDetails = () => {
    let data = new FormData();
    //console.log("file", file instanceof File);
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "leah-instagram");

    fetch(CLOUD_API, {
      method: "POST", // or 'PUT'
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        // alert("success");
        //console.log(data);
        await setPhotoUrl(data.url);
        if (data.url) {
          postData(data.url);
        }
      })
      .catch((err) => {
        alert("Failed to upload photo. Please try again.");
        console.log(err);
      });
  };
  const postData = async (url) => {
    console.log({ title, body, photo: url });
    await fetch(`${API_URL}/createpost`, {
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
    if (token) {
      GetfetchWithAuth("/myprofile").then((res) => {
        //console.log("profile", res);
        const userData = res.userData;
        setUserInfo(userData);
      });
    }
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
        <DialogContent
          style={
            writingStep
              ? {
                  padding: 0,
                }
              : {
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }
          }
        >
          {!writingStep && (
            <>
              {file instanceof File ? (
                <img
                  src={
                    file instanceof File
                      ? URL.createObjectURL(file)
                      : "../photo_icon.jpeg"
                  }
                  className={"width100 pointer"}
                  style={{ width: "100%", display: "block" }}
                  onClick={() => document.getElementById("file").click()}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="200px"
                  height="200px"
                  className={"pointer"}
                  onClick={() => document.getElementById("file").click()}
                >
                  <path d="M352 432c0 8.836-7.164 16-16 16H176c-8.838 0-16-7.164-16-16L160 128H48C21.49 128 .0003 149.5 .0003 176v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48L512 384h-160L352 432zM104 439c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V439zM104 335c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V335zM104 231c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30C56 196 60.03 192 65 192h30c4.969 0 9 4.031 9 9V231zM408 409c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9v30c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9V409zM591.1 0H239.1C213.5 0 191.1 21.49 191.1 48v256c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-256C640 21.49 618.5 0 591.1 0zM303.1 64c17.68 0 32 14.33 32 32s-14.32 32-32 32C286.3 128 271.1 113.7 271.1 96S286.3 64 303.1 64zM574.1 279.6C571.3 284.8 565.9 288 560 288H271.1C265.1 288 260.5 284.6 257.7 279.3C255 273.9 255.5 267.4 259.1 262.6l70-96C332.1 162.4 336.9 160 341.1 160c5.11 0 9.914 2.441 12.93 6.574l22.35 30.66l62.74-94.11C442.1 98.67 447.1 96 453.3 96c5.348 0 10.34 2.672 13.31 7.125l106.7 160C576.6 268 576.9 274.3 574.1 279.6z" />
                </svg>
              )}
            </>
          )}
          {file instanceof File ? (
            ""
          ) : (
            <p style={{ width: "100%", height: 20 }} />
          )}
          <div className="">
            {file instanceof File ? (
              ""
            ) : (
              <UploadBtn htmlFor="file">Upload Image</UploadBtn>
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
                  style={{ width: 30, height: 30, marginRight: 12 }}
                >
                  <img
                    src={userInfo.photo || DEFAULT_IMG}
                    alt={""}
                    className={"imgFit"}
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
          {file instanceof File ? (
            ""
          ) : (
            <p style={{ width: "100%", height: 50 }} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
