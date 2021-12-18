import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { API_URL, fetchWithAuth } from "../../Constants";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState("");

  useEffect(() => {
    console.log(state);
    if (sessionStorage.getItem("token")) {
      fetchWithAuth(`${API_URL}/allpost`).then((data) => {
        console.log(data);
        setData(data.posts);
      });
    }
  }, []);
  return (
    <div style={{ maxWidth: 550, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: 160, height: 160, borderRadius: "50%" }}
            src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
          />
        </div>
        <div>
          <h4>{state?.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108 %",
            }}
          >
            <h5>{data.length}posts</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
          </div>
        </div>
      </div>
      <div className={"gallery"}>
        {data?.length > 0 &&
          data?.map((post) => <img className={"item"} src={post.photo} />)}
      </div>
    </div>
  );
};

export default Profile;
