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
} from "./loginStyle/loginStyle";
import { Divider } from "@mui/material";
import axios from "axios";
const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (email && password.length > 7) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const submitHandler = async () => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password,
      });
      if (response.status === 201) {
        alert("successfully signed in!");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", response.data.user);
        dispatch({ type: "USER", payload: JSON.parse(response.data.user) });
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
        <Input
          type="email"
          autocomplete="off"
          placeholder="Phone number, username or email address"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          autocomplete="off"
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
        <Divider style={{ margin: "5px 0" }}>OR</Divider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5%",
            color: "#385185",
            fontSize: "1.2rem",
          }}
        >
          <i className="fab fa-facebook-square"></i>
          <span>Log in with Facebook</span>
        </div>
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
          <span>Don't have an account?</span>
          <span style={{ color: "#0095f6" }}>
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </LoginCard>
    </RootContainer>
  );
};

export default Signin;
