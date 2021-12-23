import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import Navbar from "./components/Navbar";
import CreatePost from "./components/screens/CreatePost";

const AllRoutes = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="*" element={<div>Oops! Something went wrong! 404</div>} />
    </Routes>
  </div>
);

export default AllRoutes;
