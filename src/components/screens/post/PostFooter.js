import { Avatar, Button, TextField } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import moment from "moment";
import PostInput from "./PostInput";
import { FetchWithAuth, LOCAL_API } from "../../../Constants";
import { UserContext } from "../../../App";
const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const IconContainer = styled.div`
  font-size: 25px;
  display: flex;
  gap: 15%;
`;
const Content = styled.div`
width: 100%
height: ${({ expended }) => (expended ? "" : "5vh")};
padding: 10px 10px 0 10px;
`;
const InputContainer = styled.div`
  width: 100%;
  padding: 5px;
  border-top: 1px solid #eee;
`;
const CommentCover = styled.div``;
const PostFooter = ({ postId, title, content, comments, likes, createdAt }) => {
  const { state, dispatch } = useContext(UserContext);
  const [isExpended, setIsExpended] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedlikes, setSelectedLikes] = useState(likes);
  const date = new Date(createdAt);
  const [commentValue, setCommentValue] = useState("");
  // useEffect(() => {
  //   console.log("likes>>", likes);
  // }, []);
  useCallback(() => {
    renderHeart();
  }, [selectedlikes]);
  const clickHeart = async (likeOrUnlike) => {
    alert(likeOrUnlike);
    console.log(likeOrUnlike);
    await FetchWithAuth(`/${likeOrUnlike}/${postId}`, "PUT").then((res) => {
      console.log("++", res);
      //setSelectedLikes(res.result.likes);
    });
    await FetchWithAuth(`/post/${postId}`, "GET").then((res) => {
      console.log("--", res);
      setSelectedLikes(res.post.likes);
    });
  };
  const handleClick = () => {
    console.log(selectedlikes);
    console.log("c", likedBefore(selectedlikes));
    if (likedBefore(selectedlikes)) {
      clickHeart("unlike");
    } else {
      clickHeart("like");
    }
  };
  const likedBefore = (array) => {
    console.log(">>likebefore<<");
    return array.some(function (el) {
      return el._id === state._id;
    });
  };
  const submitComment = async () => {
    // await FetchWithAuth(`/comment/${postId}`, "PUT").then((res) => {
    //   console.log("++", res);
    //   //setSelectedLikes(res.result.likes);
    // });
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
        postedBy: state._id,
      }),
      redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((res) => console.log("dfdf", res));
  };
  const renderHeart = () => {
    if (likedBefore(selectedlikes)) {
      console.log("채워진하트");
      return (
        <span onClick={() => clickHeart("unlike")}>
          <i
            className="far fa-heart pointer"
            style={{
              backgroundColor: "pink",
            }}
          ></i>
        </span>
      );
    } else {
      console.log("빈하트");

      return (
        <span onClick={() => clickHeart("like")}>
          <i
            className="far fa-heart pointer"
            style={{
              backgroundColor: "white",
            }}
          ></i>
        </span>
      );
    }
  };
  return (
    <div>
      <Container>
        <IconContainer>
          {/* {renderHeart()} */}
          <i className="far fa-comment"></i>
          <i className="fab fa-telegram-plane"></i>
        </IconContainer>
        <i style={{ fontSize: 25 }} className="far fa-bookmark"></i>
      </Container>
      <Content expended={isExpended}>
        {selectedlikes.length > 0 && (
          <>
            {selectedlikes.slice(0, 1).map((like) => (
              <div key={`selectedlikes-${like}`} style={{ display: "flex" }}>
                <Avatar
                  key={like?.id}
                  sx={{ width: 25, height: 25 }}
                  src={like?.photo}
                />
                <span style={{ paddingLeft: 5 }}>
                  liked by
                  <span style={{ padding: "0 5px", fontWeight: "bold" }}>
                    {like?.userName}
                  </span>
                  and {selectedlikes.length} others
                </span>
              </div>
            ))}
          </>
        )}
        <span>{title}</span>
        <p>{content}</p>
        <p
          style={{ color: "#aaa", fontSize: 14 }}
          onClick={() => setModalOpen(true)}
        >
          View all {comments.length} comments
        </p>
        <PostModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          comments={comments}
        />
        <p>{moment(date).fromNow()}</p>
      </Content>
      <InputContainer>
        <TextField
          size={"small"}
          type="text"
          placeholder="full name"
          value={commentValue || ""}
          onChange={(e) => setCommentValue(e.target.value)}
        >
          dd
        </TextField>
        <Button onClick={submitComment}>post</Button>
      </InputContainer>
    </div>
  );
};

export default PostFooter;
