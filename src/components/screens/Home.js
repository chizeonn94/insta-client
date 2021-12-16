import React, { useEffect, useState } from "react";
import { API_URL, axiosInstance } from "../../Constants";

const Home = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`${API_URL}/allpost`)
      .then(function (response) {
        // handle success

        setData(response.data.posts);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  return (
    <div className="home">
      {data?.length > 0 &&
        data.map((post, i) => {
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
