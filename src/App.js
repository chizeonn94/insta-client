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
import CreatePost from "./components/screens/CreatePost";
import EditProfile from "./components/screens/EditProfile";

export const UserContext = createContext();

function AllRoutes() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // const user = JSON.parse(sessionStorage.getItem("user"));
    // if (!user) {
    //   return navigate("/signin");
    // }
    // dispatch({ type: "USER", payload: user });
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create" element={<CreatePost />} />
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
