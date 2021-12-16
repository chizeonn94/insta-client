import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
