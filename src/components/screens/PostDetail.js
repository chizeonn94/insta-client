import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DEFAULT_IMG, FetchWithAuth, GetfetchWithAuth } from "../../Constants";
import { useParams } from "react-router-dom";
import { PostHeader } from "./homeStyle";
import PostFooter from "./post/PostFooter";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const PostDetail = ({ postInfo }) => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(postInfo || "");
  useEffect(() => {
    if (postId) {
      FetchWithAuth(`/post/${postId}`, "GET").then((res) => {
        console.log(res);
        if (res?.post) {
          setPost(res.post);
        } else {
          alert("It's invalid post");
          navigate("/");
        }
      });
    }
  }, [postId]);
  const clickDelete = (postId) => {
    alert("delte post");
    FetchWithAuth(`/delete-post/${postId}`, "DELETE").then((res) => {
      if (res.success) {
        alert("Successfully deleted!");
      } else {
        alert("Failed to delete. Please try again.");
      }
    });
  };
  return (
    <>
      {!post && <Loading />}
      {post && (
        <div
          className="card home-card"
          style={{ border: "1px solid #dbdbdb", borderRadius: 5 }}
        >
          <PostHeader
            style={{
              display: "flex",
              borderBottom: "1px solid #dbdbdb",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10%",
                cursor: "pointer",
                alignItems: "center",
              }}
              onClick={() =>
                navigate(`/profile/${post?.postedBy?.userName}`, {
                  state: { _id: post?.postedBy?._id },
                })
              }
            >
              <Avatar
                src={post?.postedBy?.photo || DEFAULT_IMG}
                sizes="small"
              />
              <h4 style={{ fontSize: "0.9em" }}>{post?.postedBy?.userName}</h4>
            </div>
            <div style={{ fontSize: 25, fontWeight: 600, cursor: "pointer" }}>
              {post?.postedBy?._id === state?.user?._id && (
                <i
                  className="fa-solid fa-trash fa-xs pointer"
                  onClick={() => clickDelete(post?._id)}
                ></i>
              )}
            </div>
          </PostHeader>
          <div className="card-image">
            <img src={post?.photo} className={"width100"} />
          </div>
          <PostFooter
            postId={post?._id}
            title={post?.title}
            content={post?.body}
            comments={post?.comments}
            likes={post?.likes}
            createdAt={post?.createdAt}
            pressedLiked={post?.pressedLiked}
            userName={post.postedBy.userName}
          />
        </div>
      )}
    </>
  );
};

export default PostDetail;
