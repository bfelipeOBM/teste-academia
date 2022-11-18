import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import AuthService from "@/services/auth";
import { useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./SideBar.scss";

const SideBar = () => {
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

  return (
    <div className="sidebar">
      <Menu width={"100%"}>
        <span id="home" className="menu-item">
          <i className="material-icons-outlined">home</i>
          Home
        </span>
        <span id="about" className="menu-item">
          About
        </span>
        <span id="contact" className="menu-item">
          Contact
        </span>
        <span className="menu-item--small">Settings</span>
      </Menu>
    </div>
  );
};

export default SideBar;
