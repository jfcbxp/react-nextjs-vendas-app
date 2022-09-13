import { Layout } from "components/layout";
import { Input, InputCpf } from "components/common";
import { useFormik } from "formik";
import { DataTable, DataTablePageParams } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Cliente } from "app/model/cliente";
import { Page } from "app/model/common/page";
import { useClienteService } from "app/service";

interface ConsultaClienteForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  const service = useClienteService();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 10,
    totalElements: 0,
  });

  const handleSubmit = (filtro: ConsultaClienteForm) => {
    handlePage(null);
  };

  const formik = useFormik<ConsultaClienteForm>({
    onSubmit: handleSubmit,
    initialValues: {
      nome: "",
      cpf: "",
    },
  });

  const handlePage = (event: DataTablePageParams | null) => {
    setLoading(true);
    service
      .listar(formik.values.nome, formik.values.cpf, event?.page, event?.rows)
      .then((result) => {
        setClientes({ ...result, first: event ? event.first : 0 });
      })
      .finally(() => setLoading(false));
  };

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
      <br />
      <div className="columns">
        <div className="is-full">
          <DataTable
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy={true}
            paginator={true}
            first={clientes.first}
            rows={clientes.size}
            onPage={handlePage}
            loading={loading}
            emptyMessage="Nenhum registro."
          >
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
