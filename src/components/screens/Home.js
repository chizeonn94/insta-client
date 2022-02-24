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
import PostDetail from "./PostDetail";
import Loading from "../Loading";

const Home = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      GetfetchWithAuth(`/allpost`).then((data) => {
        console.log(data);
        data.posts.sort((a, b) => b.createdAt - a.createdAt);
        setData(data?.posts);
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
