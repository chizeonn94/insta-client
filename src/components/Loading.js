import React from "react";

const Loading = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    <img src={"../loading.gif"} />
  </div>
);

export default Loading;
