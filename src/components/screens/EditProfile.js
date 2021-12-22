import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  API_URL,
  API_URL2,
  CLOUD_API,
  DEFAULT_IMG,
  GetfetchWithAuth,
} from "../../Constants";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    userName: "",
    website: "",
    bio: "",
    email: "",
  });

  const [file, setFile] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    GetfetchWithAuth("/myprofile").then((res) => {
      console.log("profile", res);
      const userData = res.userData;
      setUserInfo(userData);
    });
  }, []);
  const submitHandler = () => {
    if (file instanceof File) {
      postDetails();
    } else {
      postData();
    }
  };
  const postDetails = () => {
    let data = new FormData();
    //console.log("file", file instanceof File);
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "leah-instagram");

    if (!userInfo.fullName || !userInfo.userName || !userInfo.email) {
      return alert("please add all the fields");
    }
    fetch(CLOUD_API, {
      method: "POST", // or 'PUT'
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        alert("success");
        console.log(data.url);
        if (data.url) {
          postData(data.url);
        }
      })
      .catch((err) => {
        alert("fail");
        console.log(err);
      });
  };
  const postData = (photoUrl) => {
    fetch(`${API_URL2}/profile`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        ...userInfo,
        photo: photoUrl || userInfo.photo,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("successfully posted");
          navigate("/");
        } else {
          return response.json();
        }
      })
      // .then((res) => {
      //   console.log(res);
      //   alert(res.error);
      // })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
  };
  const changeInput = (el) => {
    const { name, value } = el.target;
    setUserInfo({ ...userInfo, [name]: value });
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
      <h1>EditProfile</h1>
      <input
        type="text"
        placeholder="full name"
        name="fullName"
        value={userInfo.fullName || ""}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="user name"
        name="userName"
        value={userInfo.userName || ""}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="website"
        name="website"
        value={userInfo.website || ""}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="bio"
        name="bio"
        value={userInfo.bio || ""}
        onChange={changeInput}
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        value={userInfo.email || ""}
        onChange={changeInput}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>My picture</span>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>

        {
          <img
            src={
              file instanceof File
                ? URL.createObjectURL(file)
                : userInfo.photo || DEFAULT_IMG
            }
            style={{ width: 200 }}
          />
        }

        <p>
          <button
            className="btn waves-effect waves-light"
            onClick={submitHandler}
          >
            Submit Post
          </button>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
