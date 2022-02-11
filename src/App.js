import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
//import AllRoutes from "./AllRoutes";
import { initialState, reducer } from "./reducers/userReducer";

import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import Followers from "./components/screens/Followers";
import CreatePost from "./components/screens/CreatePost";
import EditProfile from "./components/screens/EditProfile";
import Chat from "./components/screens/chat/Chat";
import { useLocation } from "react-router";

export const UserContext = createContext();

function AllRoutes() {
  const { state, dispatch } = useContext(UserContext);
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
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      return navigate("/signin");
    }
    dispatch({ type: "USER", payload: JSON.parse(user) });
  }, []);
  return (
    <div>
      {isNeedNav() && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:userName" element={<Profile />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
