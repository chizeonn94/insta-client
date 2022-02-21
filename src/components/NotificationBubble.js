import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@mui/material";
const BubbleOuter = styled.div`
  display: flex;
  align-items: center;
  background-color: green;
  border-bottom: 1px solid #aaa;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 20px;
  border-radius: 10px;
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 9px;
    bottom: 100%;
    background-color: green;
    -webkit-clip-path: polygon(50% 0, 100% 100%, 0 100%);
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    box-shadow: 0 0 30px 0px #999;
  },
`;

/////////////////////////////////////////
const NotificationBubble = ({ follow, like, comment }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    alert("click");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderType = (type) => {
    switch (type) {
      case "like":
        return "liked your photo";
      case "follow":
        return "started following you";
      case "comment":
        return "commented:";
      default:
        return;
    }
  };

  return (
    <div>
      <BubbleOuter>
        <i className="fa-solid fa-user"></i>&nbsp;{follow}&nbsp;&nbsp;
        <i className="fa-solid fa-comment"></i>&nbsp;{comment}&nbsp;&nbsp;
        <i className="fa-solid fa-image"></i>&nbsp;{like}
      </BubbleOuter>
    </div>
  );
};

export default NotificationBubble;
