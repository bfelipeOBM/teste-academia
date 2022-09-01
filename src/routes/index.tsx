import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../ui/Home/Home";
import Login from "../ui/Login/Login";

const RouteWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default RouteWrapper;
