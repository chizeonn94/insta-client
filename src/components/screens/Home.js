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
  const likepost = (id) => {
    alert("like");
    FetchWithAuth(`/like/${id}`, "PUT")
      //.then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const dislikepost = (id) => {
    alert("dislike");
    FetchWithAuth(`/unlike/${id}`, "PUT")
      //.then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  return (
    <PostContainer className="home">
      {data &&
        data.map((post) => {
          console.log(post.likes);
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
              {/* <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
              favorite
              </i>
              <h6>title</h6>
              <p>{post.title}</p>
              <input type="text" placeholder="add a comment" />
            </div> */}
              {post.likes.includes("61c29b99bd8704b6c1aa4e0d") ? (
                <>
                  채워진하트
                  <i
                    className="material-icons"
                    onClick={() => {
                      dislikepost(post._id);
                    }}
                  >
                    favorite
                  </i>
                </>
              ) : (
                <>
                  빈하트
                  <i
                    className="material-icons"
                    onClick={() => {
                      likepost(post._id);
                    }}
                  >
                    favorite_border
                  </i>
                </>
              )}
              <PostFooter
                postId={post._id}
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
