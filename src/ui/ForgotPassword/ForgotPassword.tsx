import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import waterMark from "../../assets/carimbo_obra_compromisso.png";
import forgotpasswordImg from "../../assets/login_sideimage.png";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await resetPassword(email);
      navigate("/recovermethod");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  };
  return (
    <>
      <div className="forgotpassword-watermark-image">
        <img src={waterMark} alt="forgotpassword" />
      </div>

      <div className="forgotpassword">
        <div className="forgotpassword__left">
          <img
            src={forgotpasswordImg}
            alt="forgotpassword"
            width="1080"
            height="960"
            className="forgotpassword__img"
          />
        </div>
        <div className="forgotpassword__vertical-divider"></div>
        <div className="forgotpassword__right">
          <div
            className="forgotpassword__right__backbutton"
            onClick={() => navigate(-1)}
          >
            <span className="material-icons ">arrow_back</span>
            <span className="forgotpassword__right__backbutton__title">
              Voltar
            </span>
          </div>
          <span className="forgotpassword__right__title">
            Esqueceu a sua senha?
          </span>
          <p>Por favor, insira seu CPF/CNPJ para recuperar sua senha</p>
          <form className="forgotpassword__form" onSubmit={handleSubmit}>
            <div className="forgotpassword__form__inputs-group">
              <label className="forgotpassword__form__title" htmlFor="username">
                CPF/CNPJ
              </label>
              <input
                placeholder="Insira seu CPF/CNPJ"
                className="forgotpassword__form__input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="forgotpassword__form__button"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Resetar senha"}
            </button>
            {error && <p className="forgotpassword__error">{error}</p>}

            <div className="forgotpassword__footer">
              <span>Elaborado e desenvolvido pela MLab / Obramax</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;