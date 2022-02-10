import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import moment from "moment";
import PostInput from "./PostInput";
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
const PostFooter = ({ title, content, comments, likes, createdAt }) => {
  const [isExpended, setIsExpended] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const date = new Date(createdAt);

  return (
    <div>
      <Container>
        <IconContainer>
          <i className="far fa-heart"></i>
          <i className="far fa-comment"></i>
          <i className="fab fa-telegram-plane"></i>
        </IconContainer>
        <i style={{ fontSize: 25 }} className="far fa-bookmark"></i>
      </Container>
      <Content expended={isExpended}>
        {likes.length > 0 && (
          <>
            {likes.slice(0, 1).map((like) => (
              <div key={`likes-${like}`} style={{ display: "flex" }}>
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
                  and {likes.length} others
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
        <PostInput />
      </InputContainer>
    </div>
  );
};

export default PostFooter;
