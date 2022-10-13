import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/(\w.+\s).+/i, "*Nome completo inválido")
    .required("*Nome completo é obrigatório"),
  password: Yup.string()
    .matches(/^.{6,}$/, "*A senha deve conter pelo menos 6 caracteres")
    .notRequired(),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val: string) => val && val !== "",
      then: Yup.string()
        .oneOf([Yup.ref("password"), null], "*Senhas não conferem")
        .required("*Confirmação de senha é obrigatória"),
    })
    .notRequired(),
  whatsapp: Yup.string()
    .matches(/^.*(?=.{14})\(\d{2}\)\s\d{5}\-\d{4}$/, "*Número inválido")
    .required("*Número é obrigatório"),
  occupation: Yup.string().required("*Profissão é obrigatória"),
});
