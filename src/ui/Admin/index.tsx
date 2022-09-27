import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "./Components/Sidebar";
import { Courses } from "./Courses";

export const Admin = () => {
  const user = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (profile && user) {
      if (user.isLoggedIn && profile.role === "admin") {
        dispatch(userProfile() as any);
      } else if (profile.role === "user") {
        window.location.href = "/";
      } else if (!user.isLoggedIn) {
        window.location.href = "/";
      }
    }
  }, [user.isLoggedIn, dispatch]);

  return (
    <Flex w="100%">
      <Sidebar />
      <Courses />
    </Flex>
  );
};
