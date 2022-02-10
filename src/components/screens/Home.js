import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  API_URL,
  axiosInstance,
  DEFAULT_IMG,
  GetfetchWithAuth,
} from "../../Constants";
import { Avatar } from "@mui/material";
import { PostContainer, PostHeader } from "./homeStyle";
import PostFooter from "./post/PostFooter";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const token = sessionStorage.getItem("token");
  // console.log("data", data);
  useEffect(() => {
    if (token) {
      GetfetchWithAuth(`/allpost`).then((data) => {
        console.log("state>>.", data);
        setData(data?.posts);
      });
    }
  }, []);
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
                <img src={post.photo} />
              </div>
              {/* <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
              favorite
              </i>
              <h6>title</h6>
              <p>{post.title}</p>
              <input type="text" placeholder="add a comment" />
            </div> */}
              <PostFooter
                title={post.title}
                content={post?.body}
                comments={post?.comments}
                likes={post.likes}
                createdAt={post?.createdAt}
              />
            </div>
          );
        })}
    </PostContainer>
  );
};

export default Home;
