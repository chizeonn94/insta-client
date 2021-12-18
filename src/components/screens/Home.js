import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { API_URL, axiosInstance } from "../../Constants";

const Home = () => {
  const [data, setData] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const getAllPost = async (url) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      //mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  useEffect(() => {
    console.log("state>>.", state);
    if (sessionStorage.getItem("token")) {
      getAllPost(`${API_URL}/allpost`).then((data) => {
        setData(data.posts);
      });
    }
  }, []);
  return (
    <div className="home">
      {state &&
        data?.length > 0 &&
        data.map((post) => {
          return (
            <div className="card home-card" key={post._id}>
              <h5>{post.title}</h5>
              <div className="card-image">
                <img src={post.photo} />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{ color: "red" }}>
                  favorite
                </i>
                <h6>title</h6>
                <p>{post.title}</p>
                <input type="text" placeholder="add a comment" />
              </div>
            </div>
          );
        })}
      <div className="card home-card">
        <h5>ramesh</h5>
        <div className="card-image">
          <img
            src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>this is amazing post</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
