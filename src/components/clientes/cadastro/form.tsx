import { Cliente } from "app/model/cliente";
import { useFormik } from "formik";
import { Input, InputCpf, InputTelefone } from "components";
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

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
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
        />
        <Input
          label="Nascimento: *"
          autoComplete="off"
          id="nascimento"
          name="nascimento"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.nascimento}
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
        />
        <InputTelefone
          label="Telefone: *"
          autoComplete="off"
          id="telefone"
          name="telefone"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.telefone}
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
