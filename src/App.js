import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  Fragment,
} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import Followers from "./components/screens/Followers";
import CreatePost from "./components/screens/CreatePost";
import EditProfile from "./components/screens/EditProfile";
import Chat from "./components/screens/chat/Chat";
import { useLocation } from "react-router";
import Likes from "./components/screens/Likes";
import Comments from "./components/screens/Comments";
import ChangePW from "./components/screens/ChangePW";
import { connectSocket } from "./socket/SocketActions";

import { connect, Provider } from "react-redux";
import { selectCurrentUser } from "./redux/usreSelectors";
import { readyToconnect } from "./socket/SocketServices";
import { signInStart } from "./actions/userActions";

// function AllRoutes() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isNeedNav = () => {
//     const path = location.pathname;
//     if (path === "/signin" || path === "/signup") {
//       return false;
//     } else {
//       return true;
//     }
//   };
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       //signInStart(null, null, token);
//       //connectSocket();
//       //fetchNotificationsStart(token);
//     }
//     const user = sessionStorage.getItem("user");
//     if (!user) {
//       //return navigate("/signin");
//     }
//     //dispatch({ type: "USER", payload: JSON.parse(user) });
//   }, []);
//   return (
//     <div>
//       {isNeedNav() && <Navbar />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/profile/:userName" element={<Profile />} />
//         <Route path="/followers/:userName" element={<Followers />} />
//         <Route path="/edit-profile" element={<EditProfile />} />
//         <Route path="/create" element={<CreatePost />} />
//         <Route path="/likes" element={<Likes />} />
//         <Route path="/comments/:postId" element={<Comments />} />
//         <Route path="/changepassword" element={<ChangePW />} />
//         <Route path="/chat" element={<Chat />} />
//       </Routes>
//     </div>
//   );
// }

//export default connect(mapStateToProps, mapDispatchToProps)(AllRoutes);

export function UnconnectedApp({ signInStart, connectSocket }) {
  const navigate = useNavigate();

  const location = useLocation();
  const isNeedNav = () => {
    const path = location.pathname;
    if (path === "/signin" || path === "/signup") {
      return false;
    } else {
      return true;
    }
  };
  const token = sessionStorage.getItem("token");
  console.log(connectSocket);
  console.log("dfdf", token);
  useEffect(() => {
    console.log("token in app.js", token);
    if (token) {
      signInStart(null, null, token);
      //connectSocket();
      //fetchNotificationsStart(token);
    }
  }, [token]);
  const renderAllRoutes = () => {
    return (
      <Fragment>
        {isNeedNav() && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/followers/:userName" element={<Followers />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/comments/:postId" element={<Comments />} />
          <Route path="/changepassword" element={<ChangePW />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Fragment>
    );
  };
  return <div>{renderAllRoutes()}</div>;
}
// const mapStateToProps = (state) => ({
//   user: selectCurrentUser(state),
// });
const mapDispatchToProps = (dispatch) => ({
  signInStart: (usernameOrEmail, password, token) =>
    dispatch(signInStart(usernameOrEmail, password, token)),
  connectSocket: () => {
    console.log("connectsocket>>>>");
    const socket = readyToconnect();

    dispatch({ type: "CONNECT", payload: socket });
    console.log("connecting socket");

    socket.on("newNotification", (data) => {
      dispatch({ type: "ADD_NOTIFICATION", payload: data });
    });

    socket.on("newPost", (data) => {
      dispatch({ type: "ADD_POST", payload: data });
    });

    socket.on("deletePost", (data) => {
      dispatch({ type: "REMOVE_POST", payload: data });
    });
    //dispatch({ type: "hi", payload: null });
  },
  // fetchNotificationsStart: (authToken) =>
  //   dispatch(fetchNotificationsStart(authToken)),
});
export default connect(null, mapDispatchToProps)(UnconnectedApp);

//export default App;
