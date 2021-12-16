import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Constants";
import { UserContext } from "../../App";
const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    fetch(`${API_URL}/signin`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("successfully signed in");
          navigate("/");
        } else {
          alert("unable to signin");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data >>", data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", data.user);
        dispatch({ type: "USER", payload: data.user });
      })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={postData}>Login</button>
        <h5>
          <Link to="/signup">Don't have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
