import React from "react";

const Profile = () => {
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
          <h4>Ramesh verma</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108 %",
            }}
          >
            <h5>40 posts</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
          </div>
        </div>
      </div>
      <div className={"gallery"}>
        <img
          className={"item"}
          src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
        />
        <img
          className={"item"}
          src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
        />
        <img
          className={"item"}
          src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
        />
        <img
          className={"item"}
          src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
        />
        <img
          className={"item"}
          src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
        />
        <img
          className={"item"}
          src={"https://img.hankyung.com/photo/201701/01.13096371.1.jpg"}
        />
      </div>
    </div>
  );
};

export default Profile;
