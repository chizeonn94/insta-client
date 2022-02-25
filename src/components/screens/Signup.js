import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, axiosInstance } from "../../Constants";
import { UserContext } from "../../App";
import {
  CustomButton,
  LoginCard,
  MainTitle,
  RootContainer,
  SubTitle,
} from "./loginStyle/loginStyle";
import { Divider, TextField } from "@mui/material";
import axios from "axios";

const Signin = () => {
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
      const response = await axiosInstance.post(`${API_URL}/signup`, {
        email,
        password,
        fullName,
        userName,
      });
      console.log("signup res ", response);
      if (response.status === 201) {
        alert("successfully signed up");

        navigate("/signin");
        setEmail("");
        setPassword("");
      } else {
        alert("unable to signin");
        throw new Error("Could not log in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootContainer>
      <LoginCard>
        <MainTitle>Instagram</MainTitle>
        <SubTitle>
          Sign up to see photos and videos <br />
          from your friends.
        </SubTitle>
        {/* <CustomButton
          style={{ fontSize: "1.1rem" }}
          fullWidth
          variant="contained"
          color="primary"
        >
          <i className="fab fa-facebook-square whiteColor"></i>
          <span style={{ fontSize: "1rem", marginLeft: 10, color: "white" }}>
            Log in with Facebook
          </span>
        </CustomButton>
        <Divider style={{ margin: "5px 0", fontSize: "0.9em" }}>OR</Divider> */}
        <TextField
          fullWidth
          size={"small"}
          type="email"
          placeholder="email address"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p style={{ height: 8 }} />

        <TextField
          fullWidth
          size={"small"}
          type="text"
          placeholder="Full Name"
          value={fullName || ""}
          onChange={(e) => setFullName(e.target.value)}
        />
        <p style={{ height: 8 }} />

        <TextField
          fullWidth
          size={"small"}
          type="text"
          placeholder="Username"
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
        <p style={{ height: 8 }} />

        <TextField
          fullWidth
          size={"small"}
          type="password"
          size={"small"}
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p style={{ height: 8 }} />

        <CustomButton
          disabled={isDisabled}
          style={{ margin: "10px 0" }}
          fullWidth
          color="primary"
          variant="contained"
          onClick={submitHandler}
        >
          Sign up
        </CustomButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2%",
            fontSize: "0.9em",
          }}
        >
          <span>Have an account?</span>
          <span>
            <Link to="/signin" className={"blueColor"}>
              Log in
            </Link>
          </span>
        </div>
      </LoginCard>
    </RootContainer>
  );
};

export default Signin;
