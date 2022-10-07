import { useWindowSize } from "@/application/common/Utils";
import { UserLogin } from "@/application/models/user";
import { ApplicationState } from "@/application/store";
import { login } from "@/application/store/user/action";
import waterMark from "@/assets/carimbo_obra_compromisso.png";
import googleLogo from "@/assets/google@2x.png";
import loginImg from "@/assets/login_sideimage.png";
import obramaxLogo from "@/assets/obramax@2x.png";
import {
  signInWithGoogle,
} from "@/services/firebase/firebase-integration";
import Toast from "@/ui/Toast/Toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Login.scss";

const LOGIN_TYPE = {
  GOOGLE: "google",
  OBRAMAX: "obramax",
};

type LocationState = {
  toast: boolean;
};

const Login = () => {
  const [userLoginData, setUserLoginData] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [hasToast, setHasToast] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state: ApplicationState) => state.user);
  const { data: message } = useSelector(
    (state: ApplicationState) => state.message
  );

  const { width } = useWindowSize();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (location?.state) {
      const { toast } = location?.state as LocationState;
      setHasToast(toast);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const loginData: UserLogin = {
        login: userLoginData,
        password,
      };
      dispatch(login(loginData) as any);
    } catch {
      toast.error(`Erro! ${message.detail}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setLoading(false);
  };

  const handleSocialLogin = async (currentLoginType: string) => {
    try {
      switch (currentLoginType) {
        case LOGIN_TYPE.GOOGLE:
          await signInWithGoogle();
          break;
        case LOGIN_TYPE.OBRAMAX:
          await signInWithGoogle();
          break;
        default:
          break;
      }
    } catch {
      toast.error(`Erro! ${message.detail}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {width > 769 && (
        <div className="login-watermark-image">
          <img src={waterMark} alt="login" />
        </div>
      )}

      {hasToast && <Toast toast={hasToast} />}

      <div className="login">
        <div className="login__left">
          <img
            src={loginImg}
            alt="login"
            width="100%"
            height="100%"
            className="login__img"
          />
        </div>
        <div className="login__vertical-divider"></div>
        <div className="login__right">
          <div
            className="login__right__backbutton"
            onClick={() => navigate(-1)}
          >
            <span className="material-icons ">arrow_back</span>
            <span className="login__right__backbutton__title">Voltar</span>
          </div>
          <span className="login__right__title">Já possuo cadastro</span>
          <p>
            Se você tiver uma conta, acesse com seu endereço de e-mail ou
            CPF/CNPJ e senha.
          </p>
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
                value={userLoginData}
                onChange={(e) => setUserLoginData(e.target.value)}
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
                <label
                  className="login__form__aux__buttons__rememberme-checkbox__label"
                  htmlFor="rememberme"
                >
                  <input
                    className="login__form__aux__buttons__rememberme-checkbox"
                    type="checkbox"
                  ></input>
                  <span>&nbsp;</span>
                  Lembrar-me
                </label>
              </div>
              <div className="login__form__aux__buttons__forgot-password">
                <Link
                  className="login__form__aux__buttons__forgot-password__link"
                  to="/forgotpassword"
                >
                  Esqueceu a sua senha?
                </Link>
              </div>
            </div>

            <div className="login__form__login__buttons">
              <button
                className="login__form__login__buttons__login"
                type="submit"
                disabled={loading}
              >
                Entrar
              </button>

              <div className="login__form__login__buttons__sociallogin">
                <span className="login__form__login__buttons__sociallogin__title">
                  ou entrar com:
                </span>

                <div className="login__form__login__buttons__sociallogin__buttons">
                  <div
                    className="login__form__login__buttons__sociallogin__buttons__icon"
                    onClick={() => handleSocialLogin(LOGIN_TYPE.OBRAMAX)}
                  >
                    <img
                      src={obramaxLogo}
                      alt="obramax"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div
                    className="login__form__login__buttons__sociallogin__buttons__icon"
                    onClick={() => handleSocialLogin(LOGIN_TYPE.GOOGLE)}
                  >
                    <img
                      src={googleLogo}
                      alt="google"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="login__form__first-access">
            <p>
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
