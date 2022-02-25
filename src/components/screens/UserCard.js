import { Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DEFAULT_IMG, FetchWithAuth } from "../../Constants";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router";
const ProfileWrap = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;
const UserCard = ({ avatar, userName, subText, onClick, date }) => {
  const navigate = useNavigate();

  return (
    <div className="flex alignCenter" style={{ padding: "10px" }}>
      <div
        className={"flex pointer"}
        onClick={() => navigate(`/profile/${userName}`)}
      >
        <ProfileWrap>
          <img src={avatar || DEFAULT_IMG} className={"imgFit"} />
        </ProfileWrap>
      </div>

      <div className="user-card__details">
        <div
          style={{ textDecoration: "none" }}
          onClick={() => navigate(`/profile/${userName}`)}
        >
          <p className="bold">{userName}</p>
        </div>

        {subText && (
          <p>
            <span className={"lightGray"} style={{ fontSize: "0.85em" }}>
              {subText}
            </span>
            {date && <span>{/* {formatDateDistance(date)} */}</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
