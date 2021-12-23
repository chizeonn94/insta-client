import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, API_URL2, CLOUD_API } from "../../Constants";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  //cloudinary
  //id: 5959_jis@naver.com
  //password : @Abcd1234
  const postDetails = () => {
    let data = new FormData();
    console.log("file", file instanceof File);
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "leah-instagram");

    if (!title || !body || !file) {
      return alert("please add all the fields");
    }
    fetch(CLOUD_API, {
      method: "POST", // or 'PUT'
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        alert("success");
        console.log(data);
        await setPhotoUrl(data.url);
        if (data.url) {
          postData(data.url);
        }
      })
      .catch((err) => {
        alert("fail");
        console.log(err);
      });
  };
  const postData = () => {
    fetch(`${API_URL}/createpost`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ title, body, photo: photoUrl }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("successfully posted");
          navigate("/");
        } else {
          return response.json();
        }
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
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: 500,
        padding: 20,
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body || ""}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image </span>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            value={file?.name || ""}
            // onChange={(e) => console.log(e)}
          />
        </div>

        <button className="btn waves-effect waves-light" onClick={postDetails}>
          Submit Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
