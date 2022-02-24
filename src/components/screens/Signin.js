import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, axiosInstance, LOCAL_API } from "../../Constants";
import {
  CustomButton,
  Input,
  LoginCard,
  MainTitle,
  RootContainer,
} from "./loginStyle/loginStyle";
import { Divider, TextField } from "@mui/material";
import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
import { connectSocket } from "../../socket/SocketActions";
import userTypes from "../../actionTypes/userTypes";
import { connect, useSelector } from "react-redux";
import { signInStart } from "../../actions/userActions";

const Signin = ({ signInStart }) => {
  //const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (email && password.length > 7) {
      setIsDisabled(false);
    }
    return () => setIsDisabled(false);
  }, [email, password]);

  const submitHandler = async () => {
    try {
      signInStart(email, password, null);
      if (state.user) {
        navigate("/");
      }
    } catch (error) {
      alert("Failed to sign in, Please try again.");
      console.log(error);
    }
  };

  return (
    <RootContainer>
      <LoginCard>
        <MainTitle>Instagram</MainTitle>
        <p style={{ height: 30 }} />
        <TextField
          fullWidth
          size={"small"}
          type="email"
          autoComplete="off"
          placeholder="Email address"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p style={{ height: 8 }} />
        <TextField
          fullWidth
          size={"small"}
          type="password"
          autoComplete="off"
          placeholder="Password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          style={{
            textAlign: "right",
            fontWeight: "bold",
            fontSize: "0.9em",
            padding: "12px 0 20px",
          }}
        >
          <a className={"pointer blueColor"}>Forgot password?</a>
        </p>
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
        <Divider style={{ margin: "5px 0", fontSize: "0.9em" }}>OR</Divider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5%",
            color: "#385185",
            fontSize: "1.2rem",
            display: "none",
          }}
        >
          <i className="fab fa-facebook-square"></i>
          <span>Log in with Facebook</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2%",
            fontSize: "0.9em",
          }}
        >
          <span>Don't have an account?</span>
          <span>
            <Link to="/signup" style={{ color: "#0095f6" }}>
              Sign up
            </Link>
          </span>
        </div>
      </LoginCard>
    </RootContainer>
  );
};

// export default Signin;

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
});

export default connect(null, mapDispatchToProps)(Signin);
