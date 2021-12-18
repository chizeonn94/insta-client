import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, axiosInstance } from "../../Constants";
import { UserContext } from "../../App";
import {
  CustomButton,
  Input,
  LoginCard,
  MainTitle,
  RootContainer,
  SubTitle,
} from "./loginStyle/loginStyle";
import { Divider } from "@mui/material";
import axios from "axios";
const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (email && password.length > 7) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const submitHandler = async () => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        fullName,
        userName,
      });
      if (response.status === 201) {
        alert("successfully signed in");
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user", response.user);
        dispatch({ type: "USER", payload: response.user });
        navigate("/");
        setEmail("");
        setPassword("");
      } else {
        alert("unable to signin");
        throw new Error("Could not log in");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <RootContainer>
      <LoginCard top>
        <MainTitle>Instagram</MainTitle>
        <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
        <CustomButton
          style={{ fontSize: "1.1rem" }}
          fullWidth
          variant="contained"
          color="primary"
        >
          <i className="fab fa-facebook-square"></i>
          <span style={{ fontSize: "1rem", marginLeft: 10 }}>
            Log in with Facebook
          </span>
        </CustomButton>
        <Divider style={{ margin: "5px 0" }}>OR</Divider>
        <Input
          type="email"
          placeholder="Mobile number or email address"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName || ""}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Username"
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton
          disabled={isDisabled}
          style={{ margin: "10px 0" }}
          fullWidth
          color="primary"
          variant="contained"
          onClick={submitHandler}
        >
          Log in
        </CustomButton>
        <p style={{ textAlign: "center" }}>Forgetten your password?</p>
      </LoginCard>
      <LoginCard bottom>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2%",
            fontSize: "1.2rem",
          }}
        >
          <span>Have an account?</span>
          <span style={{ color: "#0095f6" }}>
            <Link to="/signin">Log in</Link>
          </span>
        </div>
      </LoginCard>
    </RootContainer>
  );
};

export default Signin;
