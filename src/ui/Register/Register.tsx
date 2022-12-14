import { cpfOrCnpjMask, phoneMask } from "@/application/common/Utils";
import { User } from "@/application/models/user";
import { ApplicationState } from "@/application/store";
import { register } from "@/application/store/user/action";
import waterMark from "@/assets/carimbo_obra_compromisso.png";
import facebookLogo from "@/assets/facebook@2x.png";
import googleLogo from "@/assets/google@2x.png";
import registerImg from "@/assets/login_sideimage.png";
import obramaxLogo from "@/assets/obramax@2x.png";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from "react-toastify";
import "./Register.scss";
import { formInitialState, schema } from "./RegisterForm";

const REGISTER_TYPE = {
  FACEBOOK: "facebook",
  GOOGLE: "google",
  OBRAMAX: "obramax",
};

interface RegisterForm {
  name: string;
  email: string;
  document: string;
  password: string;
  confirmPassword: string;
  whatsapp: string;
  occupation: string;
  acceptReceiveNews: boolean;
}

interface Option {
  value: string;
  label: string;
}

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([
    { value: "Pedreiro", label: "Pedreiro" },
    { value: "Encanador", label: "Encanador" },
    { value: "Eletricista", label: "Eletricista" },
    { value: "Marceneiro", label: "Marceneiro" },
    { value: "Pintor", label: "Pintor" },
    { value: "Serralheiro", label: "Serralheiro" },
    { value: "Gesseiro", label: "Gesseiro" },
    { value: "Aplicador de drywall", label: "Aplicador de drywall" },
    { value: "Marido de aluguel", label: "Marido de aluguel" },
    { value: "Mestre de obras", label: "Mestre de obras" },
    { value: "", label: "DIGITE OUTRA PROFISSÃO" },
  ]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const { data: message } = useSelector(
    (state: ApplicationState) => state.message
  );

  const initialFormValues: RegisterForm = formInitialState;

  const handleSubmit = async (values: RegisterForm) => {
    try {
      setLoading(true);
      const registerData: User = {
        name: values.name,
        email: values.email,
        password: values.password,
        document: values.document.replace(/\D/g, ""),
        phone: values.whatsapp,
        occupation: values.occupation,
        accept_receive_news: values.acceptReceiveNews,
      };

      await dispatch(register(registerData) as any);
      navigate("/");
    } catch {
      toast.error(`${message.detail}`, {
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
      alert("Falha ao se registrar!");
    }
  };

  const createOption = (inputValue: string) => {
    return {
      value: inputValue.toLowerCase().replace(/\W/g, ""),
      label: inputValue,
    };
  };

  const handleOptionChange = (newValue: OnChangeValue<Option, false>) => {
    formik.setFieldValue("occupation", newValue?.value);
    setSelectedOption(newValue);
  };

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);
    setOptions((oldOption) => [...oldOption, newOption]);
    formik.setFieldValue("occupation", inputValue);
    setSelectedOption(newOption);
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: (values: RegisterForm) => {
      handleSubmit(values);
    },
  });

  const otherOccupationStyle = () => {
    return formik.values.occupation === "DIGITE OUTRA PROFISSÃO"
      ? "other-occupation"
      : "";
  };

  return (
    <>
      <ToastContainer />
      <div className="register-watermark-image">
        <img src={waterMark} alt="register" />
      </div>

      <div className="register">
        <div className="register__left">
          <img
            src={registerImg}
            alt="register"
            width="100%"
            height="100%"
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

          <form
            className="register__form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <div className="register__form__inputs-group">
              <label className="register__form__title" htmlFor="name">
                Nome
              </label>
              <input
                placeholder="Nome completo"
                className={`register__form__input ${
                  formik.touched.name && formik.errors.name ? "error" : ""
                }`}
                type="text"
                id="name"
                value={formik.values.name}
                maxLength={95}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <span className="register__form__error">
                  {formik.errors.name}
                </span>
              )}
            </div>
            <div className="register__form__inputs-row-direction">
              <div className="register__form__input-row-group-left">
                <label className="register__form__title__email" htmlFor="email">
                  E-mail
                </label>
                <input
                  placeholder="Seu e-mail"
                  className={`register__form__input ${
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }`}
                  type="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="register__form__error">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              <div className="register__form__input-row-group-right">
                <label
                  className="register__form__title__cpf-cnpf"
                  htmlFor="cpf-cnpf"
                >
                  CPF/CNPJ
                </label>
                <input
                  placeholder="Seu CPF ou CNPJ"
                  className={`register__form__input ${
                    formik.touched.document && formik.errors.document
                      ? "error"
                      : ""
                  }`}
                  type="text"
                  id="document"
                  maxLength={18}
                  value={formik.values.document}
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "document",
                      cpfOrCnpjMask(e.target.value)
                    )
                  }
                />
                {formik.touched.document && formik.errors.document && (
                  <span className="register__form__error">
                    {formik.errors.document}
                  </span>
                )}
              </div>
            </div>
            <div className="register__form__inputs-row-direction">
              <div className="register__form__input-row-group-left">
                <label className="register__form__title" htmlFor="profession">
                  Profissão
                </label>
                <CreatableSelect
                  id="occupation"
                  onChange={(e) => handleOptionChange(e)}
                  onBlur={formik.handleBlur}
                  placeholder="Selecione sua profissão"
                  className={`register__form__input-profession ${
                    formik.errors.occupation ? "error" : ""
                  }${otherOccupationStyle()}`}
                  classNamePrefix="react-select"
                  createOptionPosition="first"
                  onCreateOption={(e) => handleCreate(e)}
                  formatCreateLabel={(e) => `Selecionar e Adicionar "${e}"`}
                  options={options}
                  value={selectedOption}
                ></CreatableSelect>
                {formik.errors.occupation && (
                  <span className="register__form__error">
                    {formik.errors.occupation}
                  </span>
                )}
              </div>
              <div className="register__form__input-row-group-right">
                <label className="register__form__title" htmlFor="whatsapp">
                  Whatsapp
                </label>
                <input
                  placeholder="Seu Whatsapp"
                  className={`register__form__input ${
                    formik.touched.whatsapp && formik.errors.whatsapp
                      ? "error"
                      : ""
                  }`}
                  type="text"
                  id="whatsapp"
                  maxLength={15}
                  value={formik.values.whatsapp}
                  onBlur={formik.handleBlur}
                  onChange={(e) =>
                    formik.setFieldValue("whatsapp", phoneMask(e.target.value))
                  }
                />
                {formik.touched.whatsapp && formik.errors.whatsapp && (
                  <span className="register__form__error">
                    {formik.errors.whatsapp}
                  </span>
                )}
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
                  className={`register__form__input-password ${
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }`}
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="register__form__error">
                    {formik.errors.password}
                  </span>
                )}
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
                  className={`register__form__input-confirm-password ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "error"
                      : ""
                  }`}
                  type="password"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className="register__form__error">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </div>
            </div>
            <div className="register__form__inputs-row-direction-space-between">
              <div className="register__form__checkbox">
                <label
                  className="register__form__checkbox__title"
                  htmlFor="acceptReceiveNews"
                >
                  <input
                    className="register__form__checkbox__input"
                    type="checkbox"
                    id="acceptReceiveNews"
                    checked={formik.values.acceptReceiveNews}
                    onChange={formik.handleChange}
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
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div
                    className="register__form__register__buttons__socialregister__buttons__icon"
                    onClick={() => handleSocialRegister(REGISTER_TYPE.FACEBOOK)}
                  >
                    <img
                      src={facebookLogo}
                      alt="facebook"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <div
                    className="register__form__register__buttons__socialregister__buttons__icon"
                    onClick={() => handleSocialRegister(REGISTER_TYPE.GOOGLE)}
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
            <button
              type="submit"
              className="register__form__button"
              disabled={loading || !formik.isValid || !formik.dirty}
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
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
