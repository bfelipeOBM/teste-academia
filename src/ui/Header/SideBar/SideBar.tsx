import Constants from "@/application/common/Constants";
import {
  getFirstAndLastName,
  navigateToExternalUrl,
} from "@/application/common/Utils";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import mlab from "@/assets/mlab.svg";
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
        <div className="sidebar__header">
          <div className="sidebar__header__avatar">
            <img src={profile.profile_image} alt="avatar" />
          </div>
          <div className="sidebar__header__name-email">
            <div className="sidebar__header__name-email__name">
              {getFirstAndLastName(profile.name)}
            </div>
            <div className="sidebar__header__name-email__email">
              {profile.email}
            </div>
          </div>
        </div>
        <div className="sidebar__profile" onClick={() => navigate("/profile")}>
          <i className="material-icons-outlined">manage_accounts</i>
          <span>Personalize aqui sua conta</span>
        </div>

        <div className="menu-divider"></div>

        <span id="home" className="menu-item" onClick={() => navigate("/")}>
          <i className="material-icons-outlined">home</i>
          Início
        </span>
        <span
          id="profile"
          className="menu-item"
          onClick={() => navigate("/profile")}
        >
          <i className="material-icons-outlined">person_outline</i>
          Minha Conta
        </span>
        <span
          id="mycertificates"
          className="menu-item"
          onClick={() => navigate("/profile")}
        >
          <i className="material-icons-outlined">workspace_premium</i>
          Meus Certificados
        </span>
        <span
          id="mycourses"
          className="menu-item"
          onClick={() => navigate("/profile")}
        >
          <i className="material-icons-outlined">fact_check</i>
          Meus Cursos
        </span>

        <div className="menu-divider"></div>

        {/* <span id="about" className="menu-item">
          <i
            className="material-icons-outlined"
            onClick={() => navigate("/about")}
          >
            info
          </i>
          Sobre a Academia
        </span> */}
        <span
          id="courses"
          className="menu-item"
          onClick={() => navigate("/courses")}
        >
          <i className="material-icons-outlined">library_books</i>
          Todos os Cursos
        </span>
        <span id="faq" className="menu-item" onClick={() => navigate("/help")}>
          <i className="material-icons-outlined">help_outline</i>
          Ajuda - FAQ
        </span>
        <span
          id="obramax"
          className="menu-item"
          onClick={() => navigateToExternalUrl(Constants.OBRAMAX_URL)}
        >
          <img src={mlab} />
          Obramax
        </span>
        <span id="logout" className="menu-item" onClick={logOut}>
          <i className="material-icons-outlined">exit_to_app</i>
          Sair
        </span>

        <div className="sidebar__footer">
          <div className="sidebar__footer__copyright">
            <span className="sidebar__footer__copyright__text">
              Elaborado e desenvolvido pela MLab / Obramax
            </span>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default SideBar;
