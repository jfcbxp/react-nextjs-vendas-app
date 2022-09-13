import { Cliente } from "app/model/cliente";
import { useFormik } from "formik";
import { Input, InputCpf, InputTelefone } from "components";
import * as Yup from "yup";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  id: "",
  nascimento: "",
  cpf: "",
  nome: "",
  endereco: "",
  telefone: "",
  email: "",
  dataCadastro: "",
};

const validationScheme = Yup.object().shape({
  nascimento: Yup.string()
    .trim()
    .required("Campo Obrigatorio")
    .length(10, "Data Invalido"),
  cpf: Yup.string()
    .trim()
    .required("Campo Obrigatorio")
    .length(14, "CPF Invalido"),
  nome: Yup.string().trim().required("Campo Obrigatorio"),
  endereco: Yup.string().trim().required("Campo Obrigatorio"),
  telefone: Yup.string().trim().required("Campo Obrigatorio"),
  email: Yup.string()
    .trim()
    .required("Campo Obrigatorio")
    .email("Email invalido"),
});

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            label="Codigo: *"
            autoComplete="off"
            id="id"
            name="id"
            disabled
            columnClasses="is-half"
            value={formik.values.id}
          />
          <Input
            label="Cadastro: *"
            autoComplete="off"
            id="cadastro"
            name="cadastro"
            disabled
            columnClasses="is-half"
            value={formik.values.dataCadastro}
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="Nome: *"
          autoComplete="off"
          id="nome"
          name="nome"
          columnClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.nome}
          error={formik.errors.nome}
        />
      </div>
      <div className="columns">
        <InputCpf
          label="Cpf: *"
          autoComplete="off"
          id="cpf"
          name="cpf"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          error={formik.errors.cpf}
        />
        <Input
          label="Nascimento: *"
          autoComplete="off"
          id="nascimento"
          name="nascimento"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.nascimento}
          error={formik.errors.nascimento}
        />
      </div>
      <div className="columns">
        <Input
          label="Endereço: *"
          autoComplete="off"
          id="endereco"
          name="endereco"
          columnClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.endereco}
          error={formik.errors.endereco}
        />
      </div>
      <div className="columns">
        <Input
          label="Email: *"
          autoComplete="off"
          id="email"
          name="email"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <InputTelefone
          label="Telefone: *"
          autoComplete="off"
          id="telefone"
          name="telefone"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.telefone}
          error={formik.errors.telefone}
        />
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">
            {formik.values.id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
};
