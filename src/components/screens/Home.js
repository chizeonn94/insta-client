import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  API_URL,
  axiosInstance,
  DEFAULT_IMG,
  FetchWithAuth,
  GetfetchWithAuth,
  LOCAL_API,
} from "../../Constants";
import { Avatar } from "@mui/material";
import { PostContainer, PostHeader } from "./homeStyle";
import PostFooter from "./post/PostFooter";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const token = sessionStorage.getItem("token");
  // console.log("data", data);
  useEffect(() => {
    if (token) {
      GetfetchWithAuth(`/allpost`).then((data) => {
        data.posts.sort((a, b) => b.createdAt - a.createdAt);
        setData(data?.posts);
      });
    }
  }, [token]);

  return (
    <PostContainer className="home">
      {data &&
        data.map((post) => {
          return (
            <div className="card home-card" key={post._id}>
              <PostHeader style={{ display: "flex" }}>
                <div
                  style={{ display: "flex", gap: "10%", cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/profile/${post.postedBy.userName}`, {
                      state: { _id: post.postedBy._id },
                    })
                  }
                >
                  <Avatar
                    src={post.postedBy.photo || DEFAULT_IMG}
                    sizes="small"
                  />
                  <h6>{post.postedBy.userName}</h6>
                </div>
                <div
                  style={{ fontSize: 25, fontWeight: 600, cursor: "pointer" }}
                >
                  ...
                </div>
              </PostHeader>
              {/* <h5>{post.title}</h5> */}
              <div className="card-image">
                <img src={post.photo} className={"width100"} />
              </div>

              <PostFooter
                postId={post._id}
                title={post.title}
                content={post?.body}
                comments={post?.comments}
                likes={post.likes}
                createdAt={post?.createdAt}
                pressedLiked={post?.pressedLiked}
              />
            </div>
          );
        })}
    </PostContainer>
  );
};

export default Home;
