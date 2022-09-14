import React, { useEffect, useRef, useState } from "react";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";
import { useNavigate } from "react-router-dom";
import waterMark from "../../../assets/carimbo_obra_compromisso.png";
import tokenImg from "../../../assets/login_sideimage.png";
import "./Token.scss";

const INITIAL_COUNT = 120;

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef<any>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num: Number) => String(num).padStart(2, "0");

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const Token = () => {
  const [tokenNumber, setTokenNumber] = useState("");
  const [userNumber, setUserNumber] = useState("(55) *****-3979");
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STARTED);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState("");
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  //TODO: colocar num utils.js
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // await token(tokenNumber);
      navigate("/login", { state: { toast: true } });
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  };
  return (
    <>
      <div className="token-watermark-image">
        <img src={waterMark} alt="token" />
      </div>

      <div className="token">
        <div className="token__left">
          <img
            src={tokenImg}
            alt="token"
            width="1080"
            height="960"
            className="token__img"
          />
        </div>
        <div className="token__vertical-divider"></div>
        <div className="token__right">
          <div
            className="token__right__backbutton"
            onClick={() => navigate(-1)}
          >
            <span className="material-icons ">arrow_back</span>
            <span className="token__right__backbutton__title">Voltar</span>
          </div>
          <span className="token__right__title">Código de verificação</span>
          <p>
            Insira abaixo o código de verificação recebido via SMS para o número{" "}
            {""}
            <strong>{userNumber}</strong>
          </p>
          <form className="token__form" onSubmit={handleSubmit}>
            <div className="token__form__inputs-group">
              <label className="token__form__title" htmlFor="tokenNumber">
                O código enviado expira em{" "}
                <span className="token__form__title__counter">
                  {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
                </span>{" "}
                minutos
              </label>
              <AuthCode
                inputClassName="token__form__input"
                length={4}
                autoFocus={false}
                onChange={handleOnChange}
                ref={AuthInputRef}
              />
            </div>
            <label className="token__form__resend__title" htmlFor="tokenNumber">
              Não recebeu o código?{" "}
              <span className="token__form__resend__title__link">Reenviar</span>
            </label>
            <button
              type="submit"
              className="token__form__button"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Confirmar"}
            </button>
            {error && <p className="token__error">{error}</p>}

            <div className="token__footer">
              <span>Elaborado e desenvolvido pela MLab / Obramax</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Token;
