import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  API_URL,
  axiosInstance,
  DEFAULT_IMG,
  GetfetchWithAuth,
} from "../../Constants";

const Home = () => {
  const [data, setData] = useState("");
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    // console.log("state>>.", state);
    if (sessionStorage.getItem("token")) {
      GetfetchWithAuth(`/allpost`).then((data) => {
        //console.log(data);
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
              <div style={{ display: "flex" }}>
                <img
                  src={post.postedBy.photo || DEFAULT_IMG}
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
                <h5>{post.postedBy.userName}</h5>
              </div>
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
    </div>
  );
};

export default Home;
