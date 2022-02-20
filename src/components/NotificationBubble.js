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
`;

/////////////////////////////////////////
const NotificationBubble = () => {
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
      <BubbleOuter>{}nnn</BubbleOuter>
    </div>
  );
};

export default NotificationBubble;
