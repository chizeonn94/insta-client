import styled from "styled-components";

export const PostContainer = styled.div``;
export const PostHeader = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FollowButton = styled.span`
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  border-color: ${(props) => (props.isFollowing ? "#ccc" : "white !important")};
  background-color: ${(props) => (props.isFollowing ? "white" : "#0095f6")};
  color: ${(props) => (props.isFollowing ? "#333" : "#fff !important")};
`;
