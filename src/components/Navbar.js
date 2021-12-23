import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import styled from "styled-components";
const NavCover = styled.div`
  width: 100%;
  min-height: 5vh;
`;
/////////////////////////////////////////
const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };
  const user = sessionStorage.getItem("user");
  return (
    <NavCover>
      <Link
        to={user ? "/" : "/signin"}
        style={{ fontFamily: "Grand Hotel" }}
        className="brand-logo left "
      >
        Instagram
      </Link>
      <Link to="/profile">Profile</Link>
      <Link to="/create">
        <i class="far fa-plus-square"></i>
      </Link>
      <button onClick={() => logout()}>Logout </button>
      <Link to="/signin">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </NavCover>
  );
};

export default Navbar;
