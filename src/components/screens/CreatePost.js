import React from "react";

const CreatePost = () => {
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
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>

        <button className="btn waves-effect waves-light">Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
