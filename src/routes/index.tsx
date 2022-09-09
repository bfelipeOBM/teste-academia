import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../ui/Home/Home";
import Login from "../ui/Login/Login";
import Register from "../ui/Register/Register";

const RouteWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default RouteWrapper;
