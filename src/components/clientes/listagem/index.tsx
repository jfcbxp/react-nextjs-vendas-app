import { Layout } from "components/layout";
import { Input, InputCpf } from "components/common";
import { useFormik } from "formik";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Cliente } from "app/model/cliente";

interface ConsultaClienteForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>();

  const handleSubmit = (filtro: ConsultaClienteForm) => {
    console.log(filtro);
  };

  const formik = useFormik<ConsultaClienteForm>({
    onSubmit: handleSubmit,
    initialValues: {
      nome: "",
      cpf: "",
    },
  });
  return (
    <Layout titulo="Clientes">
      <form onSubmit={formik.handleSubmit}>
        <div className="columns">
          <Input
            columnClasses="is-half"
            label="Nome"
            id="nome"
            name="nome"
            onChange={formik.handleChange}
            value={formik.values.nome}
          />
          <InputCpf
            columnClasses="is-half"
            label="Cpf"
            id="cpf"
            name="cpf"
            onChange={formik.handleChange}
            value={formik.values.cpf}
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success" type="submit">
              Consultar
            </button>
          </div>
        </div>
      </form>
      <div className="columns">
        <div className="is-full">
          <DataTable value={clientes}>
            <Column field="id" header="Codigo" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="Cpf" />
            <Column field="email" header="Email" />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};
