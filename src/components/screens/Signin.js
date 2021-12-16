import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Constants";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    console.log({ name, email, password });
    console.log(JSON.stringify({ name, email, password }));

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
          return alert("successfully signed in");
        }
        return alert("unable to signin");
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="password"
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
