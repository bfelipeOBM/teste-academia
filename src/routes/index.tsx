
import About from "@/ui/About/About";
import { Admin } from "@/ui/Admin";
import { BannersInfoAdmin } from "@/ui/Admin/Banner";
import { CreateBannerAdmin } from "@/ui/Admin/Banner/Create";
import { EditBannerAdmin } from "@/ui/Admin/Banner/Edit";
import { BannersMobileInfoAdmin } from "@/ui/Admin/BannerMobile";
import { CreateBannerMobileAdmin } from "@/ui/Admin/BannerMobile/Create";
import { EditBannerMobileAdmin } from "@/ui/Admin/BannerMobile/Edit";
import { ClassesInfoAdmin } from "@/ui/Admin/Courses/Classes";
import { CreateCertificateClass } from "@/ui/Admin/Courses/Classes/Certificates/Create";
import { CreateClassAdmin } from "@/ui/Admin/Courses/Classes/Create";
import { EditClassAdmin } from "@/ui/Admin/Courses/Classes/Edit";
import { CreateCourseAdmin } from "@/ui/Admin/Courses/Create";
import { EditCourseAdmin } from "@/ui/Admin/Courses/Edit";
import { CourseAdminInfos } from "@/ui/Admin/Courses/Infos";
import { CreateCourseMaterialAdmin } from "@/ui/Admin/Courses/Material/Create";
import { LocationAdminInfos } from "@/ui/Admin/Location";
import { CreateLocationAdmin } from "@/ui/Admin/Location/Create";
import { EditLocationAdmin } from "@/ui/Admin/Location/Edit";
import { UsersAdminInfos } from "@/ui/Admin/Users";
import { UsersAdminCreate } from "@/ui/Admin/Users/Create";
import { UsersAdminEdit } from "@/ui/Admin/Users/Edit";
import { UsersAdminMultiple } from "@/ui/Admin/Users/Multiple";
import Course from "@/ui/Courses/Course/Course";
import ChangePassword from "@/ui/ForgotPassword/Change/ChangePassword";
import ForgotPassword from "@/ui/ForgotPassword/ForgotPassword";
import RecoverMethod from "@/ui/ForgotPassword/RecoverMethod/RecoverMethod";
import Token from "@/ui/ForgotPassword/Token/Token";
import Home from "@/ui/Home/Home";
import Login from "@/ui/Login/Login";
import Profile from "@/ui/Profile/Profile";
import Register from "@/ui/Register/Register";
import { ChakraProvider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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
          <Route path="/about" element={<ChakraProvider><About /></ChakraProvider>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/token" element={<Token />} />
          <Route path="/recovermethod" element={<RecoverMethod />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={
              <ChakraProvider>
                <Admin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/users/"
            element={
              <ChakraProvider>
                <UsersAdminInfos />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/users/create"
            element={
              <ChakraProvider>
                <UsersAdminCreate />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/users/create/multiple"
            element={
              <ChakraProvider>
                <UsersAdminMultiple />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/users/:id/edit"
            element={
              <ChakraProvider>
                <UsersAdminEdit />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id"
            element={
              <ChakraProvider>
                <CourseAdminInfos />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id/class/:class_id"
            element={
              <ChakraProvider>
                <ClassesInfoAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id/class/:class_id/certificate"
            element={
              <ChakraProvider>
                <CreateCertificateClass />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id/edit"
            element={
              <ChakraProvider>
                <EditCourseAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/create"
            element={
              <ChakraProvider>
                <CreateCourseAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id/classes/create"
            element={
              <ChakraProvider>
                <CreateClassAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id/classes/:class_id/edit"
            element={
              <ChakraProvider>
                <EditClassAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/courses/:id/class/:classId/material"
            element={
              <ChakraProvider>
                <CreateCourseMaterialAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/locations"
            element={
              <ChakraProvider>
                <LocationAdminInfos />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/locations/create"
            element={
              <ChakraProvider>
                <CreateLocationAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/locations/:id/edit"
            element={
              <ChakraProvider>
                <EditLocationAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <ChakraProvider>
                <BannersInfoAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/banners/create"
            element={
              <ChakraProvider>
                <CreateBannerAdmin />
              </ChakraProvider>
            }
          />
        
          <Route
            path="/admin/banners/:id/edit"
            element={
              <ChakraProvider>
                <EditBannerAdmin />
              </ChakraProvider>
            }
          />

          <Route
            path="/admin/banners/mobile"
            element={
              <ChakraProvider>
                <BannersMobileInfoAdmin />
              </ChakraProvider>
            }
          />
          <Route
            path="/admin/banners/mobile/create"
            element={
              <ChakraProvider>
                <CreateBannerMobileAdmin />
              </ChakraProvider>
            }
          />
        
        <Route
          path="/admin/banners/mobile/:id/edit"
          element={
            <ChakraProvider>
              <EditBannerMobileAdmin />
            </ChakraProvider>
          }
        />
    </Route>
        
      </Routes>
    </Router>
  );
};

export default RouteWrapper;
