import axios from "axios";
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
  const postDetails = async () => {
    if (!title || !body || !file) {
      return alert("please add all the fields");
    }
    let data = new FormData();
    console.log("file", file instanceof File);
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "leah-instagram");

    const response = await axios.post(CLOUD_API, data);
    const resData = await response?.data;
    const url = await resData?.url;
    console.log("url", url);
    setPhotoUrl(url);
    if (url) {
      const response = await axios.post(`${API_URL}/createpost`, {
        title,
        body,
        photo: url,
      });
      if (response.status === 201) {
        alert("succesfully posted");
        navigate("/");
      } else {
        alert("something went wrong");
      }
    }
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
