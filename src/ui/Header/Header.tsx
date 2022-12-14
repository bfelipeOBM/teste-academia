import Constants from "@/application/common/Constants";
import {
  getFirstAndLastName,
  isMobile,
  navigateToExternalUrl,
} from "@/application/common/Utils";
import { ApplicationState } from "@/application/store";
import { setGlobalFilter } from "@/application/store/globalfilter/action";
import { clearMessage } from "@/application/store/message/action";
import { userProfile } from "@/application/store/profile/action";
import defaultProfileImage from "@/assets/default_profile_image@2x.png";
import headerLogo from "@/assets/logo-PB@2x.png";
import AuthService from "@/services/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./Header.scss";
import SideBar from "./SideBar/SideBar";

const CategoryListLeft = [
  { title: "Todos" },
  { title: "Pedreiro" },
  { title: "Eletricista" },
  { title: "Mestre de Obras" },
  { title: "Encanador" },
  { title: "Serralheiro" },
];

const CategoryListRight = [
  { title: "Gesseiro" },
  { title: "Aplicador de drywall" },
  { title: "Marido de aluguel" },
  { title: "Marceneiro" },
  { title: "Pintor" },
];

type Item = {
  id: number;
  name: string;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchebaleItems, setSearchebaleItems] = useState<Item[]>([]);

  const user = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const { courses } = useSelector((state: ApplicationState) => state.courses);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuItemClick = (keyword: string) => {
    setIsMenuOpen(false);
    dispatch(setGlobalFilter(keyword) as any);
    window.location.href = "/#course-category";
  };

  const logOut = () => {
    dispatch(clearMessage as any);
    AuthService.logout();
    setIsUserMenuOpen(false);
    navigate(0);
  };

  const handleAvatarClick = () => {
    if (user.isLoggedIn && !isMobile()) {
      setIsUserMenuOpen(!isUserMenuOpen);
    }

    if (isMobile()) {
      user.isLoggedIn ? navigate("/profile") : navigate("/login");
    }
  };

  const handleOnSearch = (string: string, results: any) => {};

  const handleOnHover = (result: any) => {};

  const handleOnSelect = (course: any) => {
    navigate(`/course/${course.id}`, { state: { id: course.id } });
  };

  const handleOnFocus = () => {};

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(userProfile() as any);
    }
  }, [user.isLoggedIn, dispatch]);

  useEffect(() => {
    if (courses) {
      const items: Item[] = courses.map((course) => {
        return {
          id: course.id,
          name: course.name,
        };
      });
      setSearchebaleItems(items);
    }
  }, [courses]);

  return (
    <>
      <header className="header">
        <div className="header__items">
          <div className="header__items__menu">
            <SideBar></SideBar>
          </div>

          <div className="header__items__logo">
            <Link to="/">
              <img
                src={headerLogo}
                width="100%"
                height="100%"
                alt="header logo"
              />
            </Link>
          </div>

          <div
            onClick={() => navigateToExternalUrl(Constants.OBRAMAX_URL)}
            className="header__items__obramax"
          >
            Obramax
          </div>

          <div className="header__items__search">
            <div style={{ width: "100%" }}>
              <ReactSearchAutocomplete
                placeholder="Pesquise por qualquer coisa"
                items={searchebaleItems}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                showNoResultsText={"Nenhum resultado encontrado"}
                autoFocus
                styling={{ zIndex: 1090 }}
              />
            </div>
          </div>

          <div
            className="header__items__categories"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="header__items__categories__title">Categorias</span>
            <i className="material-icons ">
              {!isMenuOpen ? "expand_more" : "expand_less"}
            </i>

            {isMenuOpen && (
              <div
                className={`header__items__categories__dropdown-menu__menu ${
                  isMenuOpen ? "active" : ""
                }`}
              >
                <div className="header__items__categories__dropdown-menu__menu__items__left">
                  {CategoryListLeft.map((category, index) => (
                    <div
                      key={index}
                      className="header__items__categories__dropdown-menu__menu__items__left__item"
                      onClick={() => handleMenuItemClick(category.title)}
                    >
                      <span>{category.title}</span>
                    </div>
                  ))}
                </div>

                <div className="header__items__categories__dropdown-menu__menu__items__right">
                  {CategoryListRight.map((category, index) => (
                    <div
                      key={index}
                      className="header__items__categories__dropdown-menu__menu__items__right__item"
                      onClick={() => handleMenuItemClick(category.title)}
                    >
                      <span>{category.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className="header__items__login__info"
            onClick={() => handleAvatarClick()}
          >
            <div className="header__items__login__info__avatar">
              {user.isLoggedIn ? (
                <img
                  src={profile?.profile_image || defaultProfileImage}
                  alt="avatar"
                  width="100%"
                  height="100%"
                />
              ) : (
                <i className="material-icons">account_circle</i>
              )}
            </div>

            {!user?.isLoggedIn && (
              <div className="header__items__login__info__buttons">
                <Link
                  to="/login"
                  className="header__items__login__info__buttons__button"
                >
                  <span>Entre</span>{" "}
                  <span className="header__items__login__info__buttons__or__text">
                    ou
                  </span>
                </Link>

                <Link
                  to="/register"
                  className="header__items__login__info__buttons__button"
                >
                  <span>Cadastre-se</span>
                </Link>
              </div>
            )}

            {user?.isLoggedIn && (
              <div className="header__items__login__info__username-dropdown-menu">
                <div className="header__items__login__info__username-dropdown-menu__username">
                  <span>{getFirstAndLastName(profile?.name)}</span>
                  <i className="material-icons">
                    {!isUserMenuOpen ? "expand_more" : "expand_less"}
                  </i>
                </div>

                {isUserMenuOpen && (
                  <div
                    className={`header__items__login__info__username-dropdown-menu__menu ${
                      isUserMenuOpen ? "active" : ""
                    }`}
                  >
                    <div className="header__items__login__info__username-dropdown-menu__menu__items">
                      <div
                        className="header__items__login__info__username-dropdown-menu__menu__items__item"
                        onClick={() => navigate("/profile")}
                      >
                        <span>Minha conta</span>
                      </div>

                      {profile?.role === "admin" && (
                        <a href="/admin">
                          <div className="header__items__login__info__username-dropdown-menu__menu__items__item">
                            <span>Painel de Admin</span>
                          </div>
                        </a>
                      )}

                      <div
                        className="header__items__login__info__username-dropdown-menu__menu__items__item"
                        onClick={() => logOut()}
                      >
                        <span>Sair</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
