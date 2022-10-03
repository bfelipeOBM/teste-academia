import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import AuthService from "@/services/auth";
import { useEffect } from "react";
import {
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SideBar.scss";

interface SideBarProps {
  isSideBarOpen: boolean;
}

const SideBar = (props: SideBarProps) => {
  const { isSideBarOpen } = props;

  const user = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    AuthService.logout();
    navigate(0);
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(userProfile() as any);
    }
  }, [user.isLoggedIn, dispatch]);

  console.log(isSideBarOpen);

  return (
    <div className="sidebar">
      <ProSidebar toggled={isSideBarOpen}>
        <SidebarHeader>
          {/**
           *  You can add a header for the sidebar ex: logo
           */}
        </SidebarHeader>
        <SidebarContent>
          {/**
           *  You can add the content of the sidebar ex: menu, profile details, ...
           */}
        </SidebarContent>
        <SidebarFooter>
          {/**
           *  You can add a footer for the sidebar ex: copyright
           */}
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SideBar;
