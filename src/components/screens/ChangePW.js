import { Avatar, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../App";
import { DEFAULT_IMG, FetchWithAuth, LOCAL_API } from "../../Constants";
//import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";

//import { selectCurrentUser, selectToken } from "../../redux/user/userSelectors";
//import { showAlert } from "../../redux/alert/alertActions";

//import { validatePassword } from "../../utils/validation";

// import { changePassword } from "../../services/authenticationServices";

// import Avatar from "../Avatar/Avatar";
// import TextField from "../TextField/TextField";
// import Button from "../Button/Button";
// import TextButton from "../Button/TextButton/TextButton";
// import SettingsForm from "../SettingsForm/SettingsForm";
// import div from "../SettingsForm/div/div";

const ChangePW = ({ currentUser, token, showAlert }) => {
  const state = useSelector((state) => state);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    document.title = "Change Password • Instaclone";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("wiil submit");
    if (newPassword !== confirmNewPassword) {
      return alert("Please make sure both passwords match.");
    }
    // const newPasswordError = validatePassword(newPassword);
    // if (newPasswordError) return showAlert(newPasswordError);
    try {
      setFetching(true);

      await fetch(`${LOCAL_API}/changepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((res) => {
          console.log(res);
          return alert(res.message);
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("failed to change password. please try again");
        });

      setFetching(false);
    } catch (err) {
      console.log(err);
      setFetching(false);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div>
        <Avatar
          className="avatar--small"
          src={state?.user?.photo || DEFAULT_IMG}
        />
        <h1 className="font-medium" style={{ fontSize: "2.5rem" }}>
          {state?.userName}
        </h1>
      </div>
      <div>
        <label className="heading-3 font-bold">Old Password</label>
        <TextField
          size={"small"}
          type="text"
          onChange={(event) => setOldPassword(event.target.value)}
          type="password"
        />
      </div>
      <div>
        <label className="heading-3 font-bold">New Password</label>
        <TextField
          size={"small"}
          type="text"
          onChange={(event) => setNewPassword(event.target.value)}
          type="password"
        />
      </div>
      <div>
        <label className="heading-3 font-bold">Confirm New Password</label>
        <TextField
          size={"small"}
          type="text"
          onChange={(event) => setConfirmNewPassword(event.target.value)}
          type="password"
        />
      </div>
      <div>
        <label></label>
        <Button
          style={{ width: "15rem" }}
          disabled={
            oldPassword.length < 6 ||
            newPassword.length < 6 ||
            confirmNewPassword.length < 6
          }
          onClick={handleSubmit}
        >
          Change Password
        </Button>
      </div>
      <div>
        <label></label>
        <Button style={{ width: "15rem", textAlign: "left" }}>
          Forgot Password?
        </Button>
      </div>
    </form>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
// });

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   token: selectToken,
// });

export default ChangePW;
