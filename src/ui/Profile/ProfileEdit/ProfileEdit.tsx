import {
  cpfOrCnpjMask,
  phoneMask,
  useWindowSize,
} from "@/application/common/Utils";
import { User } from "@/application/models/user";
import { ApplicationState } from "@/application/store";
import { updateProfile } from "@/application/store/profile/action";
import facebookLogo from "@/assets/facebook@2x.png";
import googleLogo from "@/assets/google@2x.png";
import obramaxLogo from "@/assets/obramax@2x.png";
import ImageUpload from "@/ui/ImageUpload/ImageUpload";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "./ProfileEdit.scss";
import { schema } from "./ProfileEditForm";

interface ProfileEditForm {
  name: string;
  email: string;
  document: string;
  password: string;
  confirmPassword: string;
  whatsapp: string;
  occupation: string;
}

interface ProfileEditProps {
  userInfo: User;
}

const ProfileEdit = (props: ProfileEditProps) => {
  const { userInfo } = props;
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(
    userInfo.image || "https://i.pravatar.cc/300"
  );
  const [userImageFile, setUserImageFile] = useState<File>();
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const { data: message } = useSelector(
    (state: ApplicationState) => state.message
  );

  const initialFormValues: ProfileEditForm = {
    name: userInfo.name,
    email: userInfo.email,
    document: userInfo.document || "",
    password: "",
    confirmPassword: "",
    whatsapp: userInfo.phone,
    occupation: userInfo.occupation || "",
  };

  const handleSubmit = async (values: ProfileEditForm) => {
    try {
      setLoading(true);
      const profileData: User = {
        id: userInfo.id,
        name: values.name,
        email: values.email,
        password: values.password,
        document: values.document.replace(/\D/g, ""),
        phone: values.whatsapp,
        occupation: values.occupation,
      };

      await dispatch(updateProfile(profileData) as any);
    } catch {
      alert(message.detail);
    }

    setLoading(false);
  };

  const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setUserImageFile(e.target.files[0]);
      setUserImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: (values: ProfileEditForm) => {
      handleSubmit(values);
    },
  });

  const options = [
    { value: "eletricista", label: "Eletricista" },
    { value: "pedreiro", label: "Pedreiro" },
    { value: "encanador", label: "Encanador" },
    { value: "pintor", label: "Pintor" },
  ];

  //TODO: get user data from api
  const userInfoMock = {
    name: "John Doe",
    description: "Mil e uma utilidade da resina acrílica na obra",
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit__header">
        <span className="profile-edit__header__title">Meus Dados</span>
        <span className="profile-edit__header__description">
          Olá {userInfo.name}, o curso{" "}
          <strong>{userInfoMock.description}</strong> inicia em breve
        </span>
      </div>
      <div className="profile-edit__form">
        {width < 769 && (
          <div className="profile-edit__form__avatar-upload">
            <div className="profile-edit__form__avatar-upload__title">
              <span>Imagem de Perfil</span>
            </div>
            <div className="profile-edit__form__avatar-upload__image">
              <ImageUpload src={userImage} onChange={photoUpload}></ImageUpload>
            </div>
            <div className="profile-edit__form__avatar-upload__button">
              <button
                type="button"
                className="profile-edit__form__avatar-upload__button-button"
                onClick={() => {}}
                disabled={loading || !userImageFile}
              >
                Enviar Imagem
              </button>
            </div>
            <div className="profile-edit__form__avatar-upload__register__buttons__socialregister">
              <span className="profile-edit__form__avatar-upload__register__buttons__socialregister__title">
                Vincular conta:
              </span>

              <div className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons">
                <div
                  className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons__icon"
                  onClick={() => {}}
                >
                  <img
                    src={obramaxLogo}
                    alt="obramax"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div
                  className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons__icon"
                  onClick={() => {}}
                >
                  <img
                    src={facebookLogo}
                    alt="facebook"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div
                  className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons__icon"
                  onClick={() => {}}
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
        )}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="profile-edit__form__inputs-group">
            <label className="profile-edit__form__title" htmlFor="name">
              Nome
            </label>
            <input
              placeholder="Nome completo"
              className={`profile-edit__form__input ${
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
              <span className="profile-edit__form__error">
                {formik.errors.name}
              </span>
            )}
          </div>
          <div className="profile-edit__form__inputs-row-direction">
            <div className="profile-edit__form__input-row-group-left">
              <label
                className="profile-edit__form__title__email"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                placeholder="Seu e-mail"
                className={`profile-edit__form__input ${
                  formik.touched.email && formik.errors.email ? "error" : ""
                }`}
                type="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="profile-edit__form__error">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="profile-edit__form__input-row-group-right">
              <label
                className="profile-edit__form__title__cpf-cnpf"
                htmlFor="cpf-cnpf"
              >
                CPF/CNPJ
              </label>
              <input
                placeholder="Seu CPF ou CNPJ"
                className={`profile-edit__form__input ${
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
                <span className="profile-edit__form__error">
                  {formik.errors.document}
                </span>
              )}
            </div>
          </div>
          <div className="profile-edit__form__inputs-row-direction">
            <div className="profile-edit__form__input-row-group-left">
              <label className="profile-edit__form__title" htmlFor="profession">
                Profissão
              </label>
              <Select
                id="occupation"
                onChange={(e) => {
                  formik.setFieldValue("occupation", e?.value as string);
                }}
                onBlur={formik.handleBlur}
                placeholder="Selecione sua profissão"
                className={`profile-edit__form__input-profession ${
                  formik.errors.occupation ? "error" : ""
                }`}
                classNamePrefix="react-select"
                options={options}
                value={options?.find(
                  (option) => option.value === formik.values.occupation
                )}
              ></Select>
              {formik.errors.occupation && (
                <span className="profile-edit__form__error">
                  {formik.errors.occupation}
                </span>
              )}
            </div>
            <div className="profile-edit__form__input-row-group-right">
              <label className="profile-edit__form__title" htmlFor="whatsapp">
                Whatsapp
              </label>
              <input
                placeholder="Seu Whatsapp"
                className={`profile-edit__form__input ${
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
                <span className="profile-edit__form__error">
                  {formik.errors.whatsapp}
                </span>
              )}
            </div>
          </div>
          <div className="profile-edit__form__inputs-row-direction">
            <div className="profile-edit__form__input-row-group-left">
              <label
                className="profile-edit__form__title-password"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                placeholder="Sua senha"
                className={`profile-edit__form__input-password ${
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
                <span className="profile-edit__form__error">
                  {formik.errors.password}
                </span>
              )}
            </div>
            <div className="profile-edit__form__input-row-group-right">
              <label
                className="profile-edit__form__title__confirm-password"
                htmlFor="confirmPassword"
              >
                Confirmar senha
              </label>
              <input
                placeholder="Confirme sua senha"
                className={`profile-edit__form__input-confirm-password ${
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
                  <span className="profile-edit__form__error">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>
          </div>
          <button
            type="submit"
            className="profile-edit__form__button"
            disabled={loading || !formik.isValid || !formik.dirty}
          >
            {loading ? "Carregando..." : "Atualizar Dados"}
          </button>
        </form>
        {width > 769 && (
          <div className="profile-edit__form__avatar-upload">
            <div className="profile-edit__form__avatar-upload__title">
              <span>Imagem de Perfil</span>
            </div>
            <div className="profile-edit__form__avatar-upload__image">
              <ImageUpload src={userImage} onChange={photoUpload}></ImageUpload>
            </div>
            <div className="profile-edit__form__avatar-upload__button">
              <button
                type="button"
                className="profile-edit__form__avatar-upload__button-button"
                onClick={() => {}}
                disabled={loading || !userImageFile}
              >
                Enviar Imagem
              </button>
            </div>
            <div className="profile-edit__form__avatar-upload__register__buttons__socialregister">
              <span className="profile-edit__form__avatar-upload__register__buttons__socialregister__title">
                Vincular conta:
              </span>

              <div className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons">
                <div
                  className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons__icon"
                  onClick={() => {}}
                >
                  <img
                    src={obramaxLogo}
                    alt="obramax"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div
                  className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons__icon"
                  onClick={() => {}}
                >
                  <img
                    src={facebookLogo}
                    alt="facebook"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div
                  className="profile-edit__form__avatar-upload__register__buttons__socialregister__buttons__icon"
                  onClick={() => {}}
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
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
