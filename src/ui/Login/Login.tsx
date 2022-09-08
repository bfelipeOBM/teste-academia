import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import waterMark from "../../assets/carimbo_obra_compromisso.png";
import loginImg from "../../assets/login_sideimage.png";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const { currentUser } = useAuth();
  const { currentUser } = { currentUser: null };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="login-watermark-image">
        <img src={waterMark} alt="login" />
      </div>

      <div className="login">
        <div className="login__left">
          <img
            src={loginImg}
            alt="login"
            width="1080"
            height="960"
            className="login__img"
          />
        </div>
        <div className="login__vertical-divider"></div>
        <div className="login__right">
          <span>Já possuo cadastro</span>
          <p>
            Se você tiver uma conta, acesse com seu endereço de e-mail ou
            CPF/CNPJ e senha.
          </p>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__form__user">
              <label className="login__form__title" htmlFor="email">
                Login
              </label>
              <input
                className="login__form__input"
                type="text"
                id="user"
                placeholder="Seu e-mail ou CPF/CNPJ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login__form__password">
              <label className="login__form__title" htmlFor="password">
                Senha
              </label>
              <input
                className="login__form__input"
                type="password"
                id="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login__form__aux__buttons">
              <div className="login__form__aux__buttons__rememberme">
                <input
                  className="login__form__aux__buttons__rememberme-radio"
                  type="radio"
                ></input>
                <label
                  className="login__form__aux__buttons__rememberme-radio__label"
                  htmlFor="rememberme"
                >
                  Lembrar-me
                </label>
              </div>
              <div className="login__form__aux__buttons__forgot-password">
                <Link
                  className="login__form__aux__buttons__forgot-password__link"
                  to="/forgot-password"
                >
                  Esqueceu a sua senha?
                </Link>
              </div>
            </div>
            <button
              className="login__form__button"
              type="submit"
              disabled={loading}
            >
              Entrar
            </button>
          </form>
          <div>
            <p className="login__form__first-access">
              <span>Este é seu primeiro acesso?</span>{" "}
              <Link className="login__form__first-access__link" to="/register">
                Cadastrar-se
              </Link>
            </p>
          </div>
          <div className="login__footer">
            <span>Elaborado e desenvolvido pela MLab / Obramax</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
