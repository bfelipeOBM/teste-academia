import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../../assets/logo-PB@2x.png";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState("expand_more");
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setMenuIcon(!isMenuOpen ? "expand_more" : "expand_less");
  };

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="header">
      <div className="header__items">
        <div className="header__items__logo">
          <Link to="/">
            <img src={headerLogo} width="159" height="40" alt="header logo" />
          </Link>
        </div>

        <div className="header__items__categories" onClick={handleMenuClick}>
          <span className="header__items__categories__title">Categorias</span>
          <i className="material-icons ">{menuIcon}</i>
        </div>
        {/* <div
            className={`header__right__menu__items ${
              isMenuOpen ? "header__right__menu__items--open" : ""
            }`}
          >
            <div
              className="header__right__menu__items__item"
              onClick={() => handleMenuItemClick("/")}
            >
              <span className="material-icons">home</span>
              <span>Home</span>
            </div>
            <div
              className="header__right__menu__items__item"
              onClick={() => handleMenuItemClick("/about")}
            >
              <span className="material-icons">info</span>
              <span>About</span>
            </div>
            <div
              className="header__right__menu__items__item"
              onClick={() => handleMenuItemClick("/contact")}
            >
              <span className="material-icons">contact_mail</span>
              <span>Contact</span>
            </div>
            <div
              className="header__right__menu__items__item"
              onClick={() => handleMenuItemClick("/login")}
            >
              <span className="material-icons">account_circle</span>
              <span>Login</span>
            </div>
            <div
              className="header__right__menu__items__item"
              onClick={() => handleMenuItemClick("/register")}
            >
              <span className="material-icons">person_add</span>
              <span>Register</span>
            </div>
          </div> */}

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

        <div className="header__items__loren__ipsum">loren ipsum</div>

        <div className="header__items__login__info">
          <div className="header__items__login__info__avatar">
            <i className="material-icons">account_circle</i>
          </div>

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
        </div>
      </div>
    </header>
  );
};

export default Header;
