import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "../ui/ForgotPassword/ForgotPassword";
import RecoverMethod from "../ui/ForgotPassword/RecoverMethod/RecoverMethod";
import Token from "../ui/ForgotPassword/Token/Token";
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
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/token" element={<Token />} />
        <Route path="/recovermethod" element={<RecoverMethod />} />
      </Routes>
    </Router>
  );
};

export default RouteWrapper;
