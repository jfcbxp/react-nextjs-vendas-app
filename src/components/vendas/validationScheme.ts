import * as Yup from "yup";

export const validationScheme = Yup.object().shape({
  cliente: Yup.object().nullable(true).required("Campo obrigatorio"),
  itens: Yup.array().min(1, "Deve conter pelo menos 1 produto"),
  formaPagamento: Yup.string().trim().required("Campo obrigatorio"),
});
