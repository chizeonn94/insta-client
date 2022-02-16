import { Avatar, Button, TextField } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import moment from "moment";
import PostInput from "./PostInput";
import { FetchWithAuth, LOCAL_API } from "../../../Constants";
import { UserContext } from "../../../App";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
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
const PostFooter = ({
  postId,
  title,
  content,
  comments,
  likes,
  createdAt,
  pressedLiked,
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [isExpended, setIsExpended] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedlikes, setSelectedLikes] = useState(likes);
  const date = new Date(createdAt);
  const [commentValue, setCommentValue] = useState("");
  const [like, setLike] = useState(pressedLiked);

  const clickHeart = async (likeOrUnlike) => {
    //alert(likeOrUnlike);
    // console.log(likeOrUnlike);
    await FetchWithAuth(`/${likeOrUnlike}/${postId}`, "PUT").then((res) => {
      console.log("++", res);
      setLike(!like);
      setSelectedLikes(res.result.likes);
    });
  };

  const renderComments = (datas) =>
    datas.splice(0, 1).map((data, i) => {
      return (
        <div key={data._id} className={"flex alignCenter spacebt"}>
          <div className={"flex alignCenter"}>
            <p
              className={"overhidden radius50 pointer"}
              style={{ width: 30, height: 30, marginRight: 12 }}
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

  return (
    <div>
      <Container>
        <IconContainer>
          <span
            style={{}}
            className={"pointer"}
            onClick={() => {
              like ? clickHeart("unlike") : clickHeart("like");
            }}
          >
            {like ? (
              <FavoriteIcon style={{ color: "rgb(237, 73, 86)" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </span>
          <span
            onClick={() =>
              navigate(`/comments/${postId}`, {
                state: { likes },
              })
            }
          >
            <i className="far fa-comment"></i>
          </span>

          <i className="fab fa-telegram-plane"></i>
        </IconContainer>
        <i style={{ fontSize: 25 }} className="far fa-bookmark"></i>
      </Container>
      <Content expended={isExpended}>
        {selectedlikes.length > 0 && (
          <>
            <div
              key={`selectedlikes-${like}`}
              style={{ display: "flex", cursor: "pointer" }}
              onClick={() =>
                navigate(`/likes`, {
                  state: { likes },
                })
              }
            >
              <Avatar
                sx={{ width: 25, height: 25 }}
                src={selectedlikes[0]?.photo}
              />
              <span style={{ paddingLeft: 5 }}>
                liked by
                <span style={{ padding: "0 5px", fontWeight: "bold" }}>
                  {selectedlikes[0]?.userName}
                </span>
                {selectedlikes.length > 1 &&
                  `and ${selectedlikes.length - 1} others`}
              </span>
            </div>
          </>
        )}
        <span>{title}</span>
        <p>{content}</p>
        <div>{comments && renderComments(comments)}</div>
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
    </div>
  );
};

export default PostFooter;
