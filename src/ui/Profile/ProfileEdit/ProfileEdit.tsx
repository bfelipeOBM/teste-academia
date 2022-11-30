import {
  capitalize,
  cpfOrCnpjMask,
  isMobile,
  phoneMask,
} from "@/application/common/Utils";
import { User } from "@/application/models/user";
import { ApplicationState } from "@/application/store";
import { updatePhoto, updateProfile } from "@/application/store/profile/action";
import defaultProfileImage from "@/assets/default_profile_image.png";
import facebookLogo from "@/assets/facebook@2x.png";
import googleLogo from "@/assets/google@2x.png";
import obramaxLogo from "@/assets/obramax@2x.png";
import ImageUpload from "@/ui/ImageUpload/ImageUpload";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from "react-toastify";
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

interface Option {
  value: string;
  label: string;
}

const ProfileEdit = (props: ProfileEditProps) => {
  const { userInfo } = props;
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(
    userInfo.profile_image || defaultProfileImage
  );
  const [userImageFile, setUserImageFile] = useState<string>();
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
  const [selectedOption, setSelectedOption] = useState<Option | null>({
    value: userInfo.occupation,
    label: userInfo.occupation && capitalize(userInfo.occupation),
  } as Option);
  const [disableUploadButton, setDisableUploadButton] = useState(true);

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

      toast.success("Dados atualizados!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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

  const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      setDisableUploadButton(false);
      const file = e.target.files[0];
      reader.onload = () => {
        setUserImageFile(reader?.result as string);
      };
      reader.readAsDataURL(file);
      setUserImage(URL.createObjectURL(file));
    }
  };

  const uploadProfileImage = async () => {
    setDisableUploadButton(true);
    try {
      if (userImageFile) {
        await dispatch(updatePhoto(userImageFile, userInfo) as any);

        toast.success("Imagem atualizada!", {
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
    onSubmit: (values: ProfileEditForm) => {
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

      <div className="profile-edit">
        <div className="profile-edit__header">
          <span className="profile-edit__header__title">Meus Dados</span>
          <span className="profile-edit__header__description">
            Olá {userInfo.name}, aqui você pode editar seus dados.
          </span>
        </div>
        <div className="profile-edit__form">
          {isMobile() && (
            <div className="profile-edit__form__avatar-upload">
              <div className="profile-edit__form__avatar-upload__title">
                <span>Imagem de Perfil</span>
              </div>
              <div className="profile-edit__form__avatar-upload__image">
                <ImageUpload
                  src={userImage}
                  onChange={changePhoto}
                ></ImageUpload>
              </div>
              <div className="profile-edit__form__avatar-upload__button">
                <button
                  type="button"
                  className="profile-edit__form__avatar-upload__button-button"
                  onClick={uploadProfileImage}
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
                  disabled
                  placeholder="Seu e-mail"
                  className="profile-edit__form__input"
                  type="email"
                  id="email"
                  value={formik.values.email}
                />
              </div>

              <div className="profile-edit__form__input-row-group-right">
                <label
                  className="profile-edit__form__title__cpf-cnpf"
                  htmlFor="cpf-cnpf"
                >
                  CPF/CNPJ
                </label>
                <input
                  disabled
                  placeholder="Seu CPF ou CNPJ"
                  className="profile-edit__form__input"
                  type="text"
                  id="document"
                  maxLength={18}
                  value={cpfOrCnpjMask(formik.values.document)}
                />
              </div>
            </div>
            <div className="profile-edit__form__inputs-row-direction">
              <div className="profile-edit__form__input-row-group-left">
                <label
                  className="profile-edit__form__title"
                  htmlFor="profession"
                >
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
          {!isMobile() && (
            <div className="profile-edit__form__avatar-upload">
              <div className="profile-edit__form__avatar-upload__title">
                <span>Imagem de Perfil</span>
              </div>
              <div className="profile-edit__form__avatar-upload__image">
                <ImageUpload
                  src={userImage}
                  onChange={changePhoto}
                ></ImageUpload>
              </div>
              <div className="profile-edit__form__avatar-upload__button">
                <button
                  type="button"
                  className="profile-edit__form__avatar-upload__button-button"
                  onClick={uploadProfileImage}
                  disabled={loading || !userImageFile || disableUploadButton}
                >
                  Enviar Imagem
                </button>
              </div>
              {/* <div className="profile-edit__form__avatar-upload__register__buttons__socialregister">
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
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
