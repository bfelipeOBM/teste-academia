import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ForgotPassword from "../ui/ForgotPassword/ForgotPassword";
import RecoverMethod from "../ui/ForgotPassword/RecoverMethod/RecoverMethod";
import Token from "../ui/ForgotPassword/Token/Token";
import Home from "../ui/Home/Home";
import Login from "../ui/Login/Login";
import Register from "../ui/Register/Register";

const PageLayout = ({ children }: any) => children;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

const RouteWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AnimationLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/token" element={<Token />} />
          <Route path="/recovermethod" element={<RecoverMethod />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouteWrapper;
