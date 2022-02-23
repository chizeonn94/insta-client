import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@mui/material";
const BubbleOuter = styled.div`
  display: flex;
  align-items: center;
  background-color: #ed4956 !important;
  border-bottom: 1px solid #aaa;
  padding: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 20px;
  border-radius: 10px;
  color:white;
  & > * {
    color:white;
  }
  & > span {
    font-size:0.7em
  }
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 5px;
    bottom: 100%;
    background-color: #ed4956 !important;
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
        {follow > 0 && (
          <>
            <i className="fa-solid fa-user"></i>&nbsp;<span>{follow}</span>
            &nbsp;&nbsp;
          </>
        )}
        {comment > 0 && (
          <>
            <i className="fa-solid fa-comment"></i>&nbsp;<span>{comment}</span>
            &nbsp;&nbsp;
          </>
        )}
        {like > 0 && (
          <>
            <i className="fa-solid fa-image"></i>&nbsp;<span>{like}</span>
            &nbsp;&nbsp;
          </>
        )}
      </BubbleOuter>
    </div>
  );
};

export default NotificationBubble;
