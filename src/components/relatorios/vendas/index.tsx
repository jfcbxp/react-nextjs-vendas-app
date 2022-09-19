import { Layout } from "components/layout";
import { useFormik } from "formik";
import { Cliente } from "app/model/cliente";
import { Page } from "app/model/common/page";
import { useClienteService, useVendaService } from "app/service";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
interface RelatorioVendasForm {
  cliente: Cliente | undefined;
  dataInicio: string;
  dataFim: string;
}
export const RelatorioVendas: React.FC = () => {
  const clienteService = useClienteService();
  const vendaService = useVendaService();
  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });
  const handleSubmit = (formData: RelatorioVendasForm) => {
    vendaService
      .gerarRelatorio(
        formData.cliente?.id,
        formData.dataInicio,
        formData.dataFim
      )
      .then((relatorio) => {
        const fileURL = URL.createObjectURL(relatorio);
        window.open(fileURL);
      });
  };

  const formik = useFormik<RelatorioVendasForm>({
    onSubmit: handleSubmit,
    initialValues: { cliente: undefined, dataFim: "", dataInicio: "" },
  });

  const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
    const nome = e.query;
    clienteService
      .listar(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: Cliente = e.value;
    formik.setFieldValue("cliente", clienteSelecionado);
  };

  return (
    <Layout titulo="Relatorio de Vendas">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-fluid">
          <div className="grid">
            <div className="col-12">
              <AutoComplete
                suggestions={listaClientes.content}
                completeMethod={handleClienteAutoComplete}
                value={formik.values.cliente}
                field="nome"
                id="cliente"
                name="cliente"
                onChange={handleClienteChange}
              />
            </div>
            <div className="col-6">
              <span className="p-float-label">
                <InputText
                  name="dataInicio"
                  id="dataInicio"
                  value={formik.values.dataInicio}
                  onChange={formik.handleChange}
                />
                <label htmlFor="dataInicio">Data Inicio</label>
              </span>
            </div>
            <div className="col-6">
              <span className="p-float-label">
                <InputText
                  name="dataFim"
                  id="dataFim"
                  value={formik.values.dataFim}
                  onChange={formik.handleChange}
                />
                <label htmlFor="dataFim">Data Fim</label>
              </span>
            </div>
            <div className="col-12">
              <Button type="submit" label="Gerar Relatorio" />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};
