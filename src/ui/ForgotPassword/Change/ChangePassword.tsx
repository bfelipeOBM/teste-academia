import waterMark from "@/assets/carimbo_obra_compromisso.png";
import changepasswordImg from "@/assets/login_sideimage.png";
import AuthService from "@/services/auth";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ChangePassword.scss";

const recoveryMethodType = {
  EMAIL: "email",
  PHONE: "phone",
};

const ChangePassword = () => {
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [recoveryMethod, setRecoveryMethod] = useState("");
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorPasswordText, setErrorPasswordText] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { phone: userNumber, email: userEmail } = JSON.parse(
    localStorage.getItem("reset-pwd-methods")!
  );

  useEffect(() => {
    if (userPassword !== "" && userPasswordConfirmation !== "") {
      if (userPassword !== userPasswordConfirmation) {
        setErrorPassword(true);
        setErrorPasswordText(true);
      } else {
        setErrorPassword(false);
        setErrorPasswordText(false);
      }
    }
  }, [userPasswordConfirmation]);

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
      await AuthService.changePassword(userDocument, userPassword);
      navigate("/login");
    } catch (error: AxiosError | any) {
      toast.error(`${error.response.data.detail}`, {
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
      <div className="changepassword-watermark-image">
        <img src={waterMark} alt="changepassword" />
      </div>

      <div className="changepassword">
        <div className="changepassword__left">
          <img
            src={changepasswordImg}
            alt="changepassword"
            width="100%"
            height="100%"
            className="changepassword__img"
          />
        </div>
        <div className="changepassword__vertical-divider"></div>
        <div className="changepassword__right">
          <div
            className="changepassword__right__backbutton"
            onClick={() => navigate(-1)}
          >
            <span className="material-icons ">arrow_back</span>
            <span className="changepassword__right__backbutton__title">
              Voltar
            </span>
          </div>
          <div>
            <span className="changepassword__right__title">
              Definir uma nova senha
            </span>
            <p style={{ height: "auto" }}>
              A nova senha deve conter <strong>letras</strong> e{" "}
              <strong>n??meros</strong> e ter no{" "}
              <strong>m??nimo 6 caracteres</strong>. Voc?? tamb??m pode usar letras
              mai??sculas e min??sculas e caracteres especiais (*, %, $, @).
            </p>
          </div>
          <form className="changepassword__form" onSubmit={handleSubmit}>
            <div className="changepassword__form__inputs-group">
              <div className="changepassword__form__checkbox">
                <label
                  className="changepassword__form__checkbox__title"
                  htmlFor="userPassword"
                >
                  Nova senha
                </label>
                <input
                  className="changepassword__form__checkbox__input"
                  type="password"
                  id="userPassword"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <span>&nbsp;</span>
              </div>
            </div>
            <div className="changepassword__form__inputs-group">
              <div className="changepassword__form__checkbox">
                <label
                  className="changepassword__form__checkbox__title"
                  htmlFor="userPassword"
                >
                  Confirmar nova senha
                </label>
                <input
                  className="changepassword__form__checkbox__input"
                  type="password"
                  id="userPassword"
                  onChange={(e) => setUserPasswordConfirmation(e.target.value)}
                />
                {errorPasswordText && (
                  <span style={{ color: "red" }}>"As senhas n??o conferem"</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="changepassword__form__button"
              disabled={loading || errorPassword}
            >
              {loading ? "Carregando..." : "Resetar senha"}
            </button>
            {error && <p className="changepassword__error">{error}</p>}

            <div className="changepassword__footer">
              <span>Elaborado e desenvolvido pela MLab / Obramax</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
