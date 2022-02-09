import React, { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    // alert("coming soon");
  }, []);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: 20,
          }}
        >
          <img
            src={
              "https://cdn.cnn.com/cnnnext/dam/assets/211206105522-file-donald-trump-0724-exlarge-169.jpg"
            }
            alt="profile"
            style={{ objectFit: "fill", width: "100%", height: "100%" }}
          />
        </p>
        <p>chizeon_lea</p>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={
                "https://cdn.cnn.com/cnnnext/dam/assets/211206105522-file-donald-trump-0724-exlarge-169.jpg"
              }
              alt="profile"
              style={{ objectFit: "fill", width: "100%", height: "100%" }}
            />
          </p>
          <p>chizeon_lea</p>
          <p>followers | posts</p>
          <button>View profile</button>
        </div>
      </div>

      <input
        style={{ border: "1px solid #ccc", borderRadius: "20px" }}
        placeholder="Message..."
      />
    </div>
  );
};

export default Chat;
