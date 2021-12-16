import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Constants";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    console.log({ name, email, password });
    console.log(JSON.stringify({ name, email, password }));

    fetch(`${API_URL}/signup`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return alert("successfully signed up");
        }
        return response.json();
      })
      .then((res) => {
        console.log(res);
        alert(res.error);
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
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={postData}>Sign up</button>
        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
