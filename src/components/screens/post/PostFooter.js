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
import { useAppState } from "../../../AppState";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const IconContainer = styled.div`
  font-size: 25px;
  align-items: center;
  display: flex;
  gap: 15%;
`;
const Content = styled.div`
width: 100%
height: ${({ expended }) => (expended ? "" : "5vh")};
padding: 0px 10px;
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
  userName,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isExpended, setIsExpended] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedlikes, setSelectedLikes] = useState(likes);
  const date = new Date(createdAt);
  const [commentValue, setCommentValue] = useState("");
  const [like, setLike] = useState(pressedLiked);

  const clickHeart = async (likeOrUnlike) => {
    await FetchWithAuth(`/${likeOrUnlike}/${postId}`, "PUT").then((res) => {
      setLike(!like);
      setSelectedLikes(res.result.likes);
    });
  };

  const renderComments = (datas) =>
    datas.splice(0, 1).map((data, i) => {
      return (
        <div key={data._id} className={"flex alignCenter spacebt"}>
          <div className={"flex alignCenter"}>
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
            style={{ marginRight: 7 }}
            className={"pointer"}
            onClick={() => {
              like ? clickHeart("unlike") : clickHeart("like");
            }}
          >
            {like ? (
              <i
                className="fa-solid fa-heart pointer"
                style={{ color: "rgb(237, 73, 86) !important" }}
              ></i>
            ) : (
              <i className="fa-regular fa-heart pointer"></i>
            )}
          </span>

          <span
            onClick={() =>
              navigate(`/comments/${postId}`, {
                state: { likes },
              })
            }
          >
            <i className="far fa-comment pointer"></i>
          </span>
        </IconContainer>
        <i style={{ fontSize: 25 }} className="far fa-bookmark"></i>
      </Container>

      <Content expended={isExpended}>
        {selectedlikes.length > 0 && (
          <>
            <div
              key={`selectedlikes-${like}`}
              style={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
              }}
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
        <p style={{ color: "#999", fontSize: "0.9em", paddingTop: 10 }}>
          {moment(date).fromNow()}
        </p>
        <div>
          {content && (
            <p style={{ padding: "12px 0 10px" }}>
              <b>{userName}</b>
              &nbsp;
              {content}
            </p>
          )}{" "}
          <div>{comments && renderComments(comments)}</div>
          {comments?.length > 0 && (
            <p
              style={{
                color: "#aaa",
                fontSize: 14,
                padding: "8px 0",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/comments/${postId}`, {
                  state: { likes },
                })
              }
            >
              View all {comments.length} comments
            </p>
          )}
        </div>

        <PostModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          comments={comments}
        />
      </Content>
    </div>
  );
};

export default PostFooter;
