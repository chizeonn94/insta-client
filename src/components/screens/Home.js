import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  API_URL,
  axiosInstance,
  DEFAULT_IMG,
  FetchWithAuth,
  GetfetchWithAuth,
} from "../../Constants";
import { Avatar } from "@mui/material";
import { PostContainer, PostHeader } from "./homeStyle";
import PostFooter from "./post/PostFooter";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PostDetail from "./PostDetail";
import Loading from "../Loading";

const Home = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // FetchWithAuth(`/allpost`, "GET").then((data) => {
      //   console.log(data);
      //   data.posts.sort((a, b) => b.createdAt - a.createdAt);
      //   setData(data?.posts);
      // });

      fetch(API_URL + `/allpost`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        //mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        redirect: "follow", // manual, *follow, error
        //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((res) => {
          // console.log(res);
          return res.json();
        })
        .then((res) => {
          //console.log(",,,,jj", res);
          res.posts.sort((a, b) => b.createdAt - a.createdAt);
          setData(res?.posts);
        });
    }
  }, [token]);

  return (
    <PostContainer className="home">
      {!data && <Loading />}
      {/* <Loading /> */}
      {data &&
        data.map((post) => {
          return <PostDetail key={post._id} postInfo={post} />;
        })}
    </PostContainer>
  );
};

export default Home;
