import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/(\w.+\s).+/i, "*Nome completo inválido")
    .required("*Nome completo é obrigatório"),
  email: Yup.string().email("*Email inválido").required("*Email é obrigatório"),
  document: Yup.string()
    .matches(
      /^.*(?=.{14})\d{3}\.\d{3}\.\d{3}\-\d{2}$|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
      "*CPF ou CNPJ inválido"
    )
    .required("*CPF ou CNPJ é obrigatório"),
  password: Yup.string()
    .matches(/^.{6,}$/, "*A senha deve conter pelo menos 6 caracteres")
    .required("*Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Senhas não conferem")
    .required("*Confirmação de senha é obrigatória"),
  whatsapp: Yup.string()
    .matches(/^.*(?=.{14})\(\d{2}\)\s\d{5}\-\d{4}$/, "*Número inválido")
    .required("*Número é obrigatório"),
  occupation: Yup.string().required("*Profissão é obrigatória"),
  acceptReceiveNews: Yup.boolean().notRequired(),
});

export const formInitialState = {
  name: "",
  email: "",
  document: "",
  password: "",
  confirmPassword: "",
  whatsapp: "",
  occupation: "",
  acceptReceiveNews: false,
};

export const formErrors = {
  nameError: false,
  emailError: false,
  documentError: false,
  passwordError: false,
  confirmPasswordError: false,
  whatsappError: false,
  occupationError: false,
  acceptReceiveNewsError: false,
};
