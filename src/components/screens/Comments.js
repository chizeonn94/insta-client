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
  LOCAL_API,
} from "../../Constants";
import { useLocation } from "react-router-dom";
import { FollowButton } from "./homeStyle";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CommentInput = styled.input`
  border: none;
  background-color: white;
  font-family: inherit;
  outline: none;
  width: 100%;
`;
const CommentButton = styled.button`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  font-family: inherit;
  background-color: transparent;
  border: none;
  color: #0095f6 !important;
`;
const Comments = () => {
  const state = useSelector((state) => state);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [postData, setPostData] = useState("");
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    FetchWithAuth(`/post/${postId}`, "GET").then((res) => {
      console.log("mm", res);
      console.log("hh", res.post.comments);
      setPostData(res.post);
      setData(res.post.comments);
    });
  }, []);

  const renderComments = (datas) =>
    datas.map((data, i) => {
      return (
        <div
          key={data._id}
          className={"flex alignCenter spacebt"}
          style={{ padding: "5px" }}
        >
          <div className={"flex alignCenter"}>
            <p
              className={"overhidden radius50 pointer"}
              style={{ width: 40, height: 40, marginRight: 12 }}
              onClick={() =>
                navigate(`/profile/${data.postedBy.userName}`, {
                  state: { _id: data._id },
                })
              }
            >
              <img
                src={data.postedBy?.photo}
                alt={"follower profile pic"}
                className={"imgFit"}
              />
            </p>
            <div
              className={"pointer"}
              onClick={() =>
                navigate(`/profile/${data.postedBy.userName}`, {
                  state: { _id: data._id },
                })
              }
            >
              <b>{data.postedBy.userName}</b>&nbsp;
              <span
                className={"lightGray"}
                style={{ fontSize: "0.9em", paddingTop: 4 }}
              >
                {data.text}
              </span>
            </div>
          </div>
        </div>
      );
    });

  const renderBody = (data) => {
    return (
      <div className={"flex alignCenter"} style={{ padding: "10px 5px" }}>
        <p
          className={"overhidden radius50 pointer"}
          style={{ width: 40, height: 40, marginRight: 12 }}
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
        <div>
          <span>
            <b>{data.postedBy.userName}</b>
          </span>
          &nbsp;&nbsp;
          {data.body}
        </div>
      </div>
    );
  };
  const submitComment = async () => {
    await fetch(LOCAL_API + `/comment/${postId}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      //mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        text: commentValue,
        postedBy: state?.user?._id,
      }),
      redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.comment.comments);
        setCommentValue("");
      });
  };
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        border: "1px solid #dbdbdb",
        marginTop: 20,
      }}
    >
      {postData && renderBody(postData)}
      <p style={{ backgroundColor: "#ccc", height: 1 }} />
      {data && renderComments(data)}
      <div
        style={{
          padding: "16px 10px",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          borderTop: "1px solid #dbdbdb",
        }}
      >
        <CommentInput
          fullWidth
          size={"small"}
          placeholder={"Write comment"}
          value={commentValue || ""}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <CommentButton onClick={submitComment}>Post</CommentButton>
      </div>
    </div>
  );
};

export default Comments;
