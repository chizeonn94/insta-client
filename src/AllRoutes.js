import React, { lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const Home = lazy(() => import("./components/screens/Home"));
const Signin = lazy(() => import("./components/screens/Signin"));
const Signup = lazy(() => import("./components/screens/Signup"));
const Profile = lazy(() => import("./components/screens/Profile"));
const Navbar = lazy(() => import("./components/Navbar"));
const CreatePost = lazy(() => import("./components/screens/CreatePost"));
const Chat = lazy(() => import("./components/screens/chat/Chat"));
const AllRoutes = () => (
  <div>
    <React.Suspense fallback={() => <h1>Loading</h1>}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<div>Oops! Something went wrong! 404</div>} />
      </Routes>
    </React.Suspense>
  </div>
);

export default AllRoutes;
