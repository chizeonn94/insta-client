import React, { useState, useEffect, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import { SocialSHareBtn } from './HospitalDetail';
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { DEFAULT_IMG, GetfetchWithAuth } from "../../Constants";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import userTypes from "../../actionTypes/userTypes";
// import { FacebookShareButton, InstapaperShareButton, TwitterShareButton } from 'react-share';

const FaceBookCard = styled.div`
  padding-top: 4px;
  color: white;
  width: 150px;
  height: 35px;
  background-color: #3c5a99;
  align-items: center;
  text-align: center;
`;

const ProfilePopUp = () => {
  const token = sessionStorage.getItem("token");
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("userName");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    userName: "",
    website: "",
    bio: "",
    email: "",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    dispatch({ type: userTypes.SIGN_OUT });
    navigate("/signin");
  };
  useEffect(() => {
    if (open && token) {
      console.log(open);
      console.log(token);
      GetfetchWithAuth("/myprofile").then((res) => {
        console.log("profile", res);
        const userData = res.userData;
        setUserInfo(userData);
      });
    }
  }, []);
  return (
    <React.Fragment>
      <span onClick={handleClick}>
        <i className="fa-solid fa-circle-user fa-xl pointer"></i>
      </span>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          // elevation: 0,
          sx: {
            overflow: "visible",
            //filter: "drop-shadow(0px 0px 3px #dbdbdb)",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              top: 55,
            },
            "& .MuiPaper-root": {
              top: 55,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <p
            onClick={() =>
              navigate(`/profile/${state?.user?.userName}`, {
                state: { _id: state?.user?._id },
              })
            }
          >
            Profile
          </p>
        </MenuItem>

        <MenuItem>
          <a onClick={logout}>Log out</a>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProfilePopUp;
