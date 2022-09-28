import { validateCpfCnpj } from "@/application/common/Utils";
import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/(\w.+\s).+/i, "*Nome completo inválido")
    .required("*Nome completo é obrigatório"),
  email: Yup.string().email("*Email inválido").required("*Email é obrigatório"),
  document: Yup.string()
    .matches(
      /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
      "*CPF ou CNPJ inválido"
    )
    .required("*CPF ou CNPJ é obrigatório")
    .test("cpf-cnpj", "*CPF ou CNPJ inválido", (value) =>
      value ? validateCpfCnpj(value) : false
    ),
  password: Yup.string().matches(
    /^.{6,}$/,
    "*A senha deve conter pelo menos 6 caracteres"
  ),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val: string) => val !== "",
      then: Yup.string()
        .oneOf([Yup.ref("password"), null], "*Senhas não conferem")
        .required("*Confirmação de senha é obrigatória"),
    })
    .notRequired(),
  whatsapp: Yup.string()
    .matches(/^.*(?=.{14})\(\d{2}\)\s\d{5}\-\d{4}$/, "*Número inválido")
    .required("*Número é obrigatório"),
  occupation: Yup.string().required("*Profissão é obrigatória"),
  acceptReceiveNews: Yup.boolean().notRequired(),
});

//TODO: Refactor this initial values
export const formInitialState = {
  name: "John Doe",
  email: "john.doe@email.com",
  document: "48149466002",
  password: "",
  confirmPassword: "",
  whatsapp: "11991234567",
  occupation: "eletricista",
};
