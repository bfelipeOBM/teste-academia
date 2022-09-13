import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import waterMark from "../../assets/carimbo_obra_compromisso.png";
import facebookLogo from "../../assets/facebook@2x.png";
import googleLogo from "../../assets/google@2x.png";
import registerImg from "../../assets/login_sideimage.png";
import obramaxLogo from "../../assets/obramax@2x.png";
import "./Register.scss";

const REGISTER_TYPE = {
  FACEBOOK: "facebook",
  GOOGLE: "google",
  OBRAMAX: "obramax",
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [profession, setProfession] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to register");
    }

    setLoading(false);
  };

  const handleSocialRegister = async (currentRegisterType: string) => {
    try {
      switch (currentRegisterType) {
        case REGISTER_TYPE.FACEBOOK:
          // await loginWithFacebook();
          break;
        case REGISTER_TYPE.GOOGLE:
          // await loginWithGoogle();
          break;
        case REGISTER_TYPE.OBRAMAX:
          // await loginWithObramax();
          break;
        default:
          break;
      }
    } catch {
      setError("Failed to register");
    }
  };

  return (
    <>
      <div className="register-watermark-image">
        <img src={waterMark} alt="register" />
      </div>

      <div className="register">
        <div className="register__left">
          <img
            src={registerImg}
            alt="register"
            width="1080"
            height="960"
            className="register__img"
          />
        </div>
        <div className="register__vertical-divider"></div>
        <div className="register__right">
          <div
            className="register__right__backbutton"
            onClick={() => navigate(-1)}
          >
            <span className="material-icons ">arrow_back</span>
            <span className="register__right__backbutton__title">Voltar</span>
          </div>
          <span className="register__right__title">Criar uma conta</span>
          <p>Se você não tiver uma conta, crie uma agora mesmo.</p>
          <form className="register__form" onSubmit={handleSubmit}>
            <div className="register__form__inputs-group">
              <label className="register__form__title" htmlFor="name">
                Nome
              </label>
              <input
                placeholder="Nome completo"
                className="register__form__input"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="register__form__inputs-group">
              <label className="register__form__title__email" htmlFor="email">
                E-mail
              </label>
              <input
                placeholder="Seu e-mail"
                className="register__form__input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="register__form__inputs-row-direction">
              <div className="register__form__input-row-group-left">
                <label className="register__form__title" htmlFor="profession">
                  Profissão
                </label>
                <Select
                  placeholder="Selecione sua profissão"
                  className="register__form__input-profession"
                ></Select>
              </div>
              <div className="register__form__input-row-group-right">
                <label className="register__form__title" htmlFor="whatsapp">
                  Whatsapp
                </label>
                <input
                  placeholder="Seu Whatsapp"
                  className="register__form__input"
                  type="text"
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
            </div>
            <div className="register__form__inputs-row-direction">
              <div className="register__form__input-row-group-left">
                <label
                  className="register__form__title-password"
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  placeholder="Sua senha"
                  className="register__form__input-password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="register__form__input-row-group-right">
                <label
                  className="register__form__title__confirm-password"
                  htmlFor="confirmPassword"
                >
                  Confirmar senha
                </label>
                <input
                  placeholder="Confirme sua senha"
                  className="register__form__input-confirm-password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="register__form__inputs-row-direction-space-between">
              <div className="register__form__checkbox">
                <label
                  className="register__form__checkbox__title"
                  htmlFor="acceptTerms"
                >
                  <input
                    className="register__form__checkbox__input"
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>&nbsp;</span>
                  Aceita receber informações da Obramax?
                </label>
              </div>
              <div className="register__form__register__buttons__socialregister">
                <span className="register__form__register__buttons__socialregister__title">
                  Vincular conta com:
                </span>

                <div className="register__form__register__buttons__socialregister__buttons">
                  <div
                    className="register__form__register__buttons__socialregister__buttons__icon"
                    onClick={() => handleSocialRegister(REGISTER_TYPE.OBRAMAX)}
                  >
                    <img
                      src={obramaxLogo}
                      alt="obramax"
                      width="33"
                      height="33"
                    />
                  </div>

                  <div
                    className="register__form__register__buttons__socialregister__buttons__icon"
                    onClick={() => handleSocialRegister(REGISTER_TYPE.FACEBOOK)}
                  >
                    <img
                      src={facebookLogo}
                      alt="facebook"
                      width="33"
                      height="33"
                    />
                  </div>

                  <div
                    className="register__form__register__buttons__socialregister__buttons__icon"
                    onClick={() => handleSocialRegister(REGISTER_TYPE.GOOGLE)}
                  >
                    <img src={googleLogo} alt="google" width="33" height="33" />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="register__form__button"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
            {error && <p className="register__error">{error}</p>}

            <div className="register__footer">
              <span>Elaborado e desenvolvido pela MLab / Obramax</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
