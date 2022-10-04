import { getFirstAndLastName, useWindowSize } from "@/application/common/Utils";
import { ApplicationState } from "@/application/store";
import { userProfile } from "@/application/store/profile/action";
import headerLogo from "@/assets/logo-PB@2x.png";
import AuthService from "@/services/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import SideBar from "./SideBar/SideBar";

const CategoryListLeft = [
  { title: "Eletricista", link: "/" },
  { title: "Pedreiro", link: "/" },
  { title: "Mestre de Obras", link: "/" },
  { title: "Encanador", link: "/" },
  { title: "Jardineiro", link: "/" },
  { title: "Empreiteiro", link: "/" },
  { title: "Azulejista", link: "/" },
  { title: "Hidráulico", link: "/" },
];

const CategoryListRight = [
  { title: "Técnico em construção civil/edificações", link: "/" },
  { title: "Arquiteto", link: "/" },
  { title: "Assentador de pisos", link: "/" },
  { title: "Marceneiro", link: "/" },
  { title: "Pintor", link: "/" },
  { title: "Engenheiro", link: "/" },
];

const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const user = useSelector((state: ApplicationState) => state.user);
  const { profile } = useSelector((state: ApplicationState) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const logOut = () => {
    AuthService.logout();
    setIsUserMenuOpen(false);
    navigate(0);
  };

  const handleAvatarClick = () => {
    if (user.isLoggedIn && width > 768) {
      setIsUserMenuOpen(!isUserMenuOpen);
    }

    if (width < 768) {
      user.isLoggedIn ? navigate("/profile") : navigate("/login");
    }
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(userProfile() as any);
    }
  }, [user.isLoggedIn, dispatch]);

  return (
    <>
      <SideBar isSideBarOpen={isSideBarOpen}></SideBar>
      <header className="header">
        <div className="header__items">
          <div
            className="header__items__menu"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <div className="header__items__menu__icon">
              <span className="material-icons">menu</span>
            </div>
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
                      onClick={() => handleMenuItemClick(category.link)}
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
                      onClick={() => handleMenuItemClick(category.link)}
                    >
                      <span>{category.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="header__items__search">
            <form className="header__items__search__form">
              <i className="material-icons">search</i>
              <input
                type="search"
                className="header__items__search__form__input"
                placeholder="Pesquise por qualquer coisa"
                spellCheck={false}
                value={searchValue}
                onChange={handleSearch}
              />
            </form>
          </div>

          <div className="header__items__all-courses">Todos os cursos</div>

          <div
            className="header__items__login__info"
            onClick={() => handleAvatarClick()}
          >
            <div className="header__items__login__info__avatar">
              <i className="material-icons">account_circle</i>
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
