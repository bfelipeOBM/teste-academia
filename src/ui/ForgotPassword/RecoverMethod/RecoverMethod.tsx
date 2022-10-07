import waterMark from "@/assets/carimbo_obra_compromisso.png";
import recoverMethodImg from "@/assets/login_sideimage.png";
import AuthService from "@/services/auth";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./RecoverMethod.scss";

const recoveryMethodType = {
  EMAIL: "email",
  PHONE: "phone",
};

const RecoverMethod = () => {
  const [usernameNumber, setUsernameNumber] = useState(false);
  const [usernameEmail, setUsernameEmail] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { phone: userNumber, email: userEmail } = JSON.parse(
    localStorage.getItem("reset-pwd-methods")!
  );

  const userDocument: string = JSON.parse(
    localStorage.getItem("userDocument")!
  );

  useEffect(() => {
    localStorage.removeItem("reset-pwd-selected-method");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      localStorage.setItem(
        "reset-pwd-selected-method",
        JSON.stringify(recoveryMethod)
      );
      await AuthService.recoverPasswordMethod(userDocument, recoveryMethod);

      toast.success("Senha alterada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/token");
    } catch (error: AxiosError | any) {
      toast.error(`Erro! ${error.response.data.detail}`, {
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
  return (
    <>
      <ToastContainer />
      <div className="recovermethod-watermark-image">
        <img src={waterMark} alt="recovermethod" />
      </div>

      <div className="recovermethod">
        <div className="recovermethod__left">
          <img
            src={recoverMethodImg}
            alt="recovermethod"
            width="100%"
            height="100%"
            className="recovermethod__img"
          />
        </div>
        <div className="recovermethod__vertical-divider"></div>
        <div className="recovermethod__right">
          <div
            className="recovermethod__right__backbutton"
            onClick={() => navigate(-1)}
          >
            <span className="material-icons ">arrow_back</span>
            <span className="recovermethod__right__backbutton__title">
              Voltar
            </span>
          </div>
          <span className="recovermethod__right__title">Escolha um método</span>
          <p>Por favor, selecione uma forma de recuperação.</p>
          <form className="recovermethod__form" onSubmit={handleSubmit}>
            <div className="recovermethod__form__inputs-group">
              <div className="recovermethod__form__checkbox">
                <label
                  className="recovermethod__form__checkbox__title"
                  htmlFor="usernameNumber"
                >
                  <input
                    className="recovermethod__form__checkbox__input"
                    type="checkbox"
                    id="usernameNumber"
                    checked={usernameNumber}
                    onChange={(e) => {
                      setUsernameNumber(e.target.checked);
                      setUsernameEmail(false);
                      setRecoveryMethod(recoveryMethodType.PHONE);
                    }}
                  />
                  <span>&nbsp;</span>
                  Utilizar a recuperação por SMS com o número{" "}
                  <strong>{userNumber}</strong>
                </label>
              </div>
            </div>
            <div className="recovermethod__form__inputs-group">
              <div className="recovermethod__form__checkbox">
                <label
                  className="recovermethod__form__checkbox__title"
                  htmlFor="usernameEmail"
                >
                  <input
                    className="recovermethod__form__checkbox__input"
                    type="checkbox"
                    id="usernameEmail"
                    checked={usernameEmail}
                    onChange={(e) => {
                      setUsernameEmail(e.target.checked);
                      setUsernameNumber(false);
                      setRecoveryMethod(recoveryMethodType.EMAIL);
                    }}
                  />
                  <span>&nbsp;</span>
                  Utilizar o e-mail <strong>{userEmail}</strong>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="recovermethod__form__button"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Resetar senha"}
            </button>
            {error && <p className="recovermethod__error">{error}</p>}

            <div className="recovermethod__footer">
              <span>Elaborado e desenvolvido pela MLab / Obramax</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecoverMethod;
