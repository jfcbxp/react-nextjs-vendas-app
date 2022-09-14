import { Cliente } from "app/model/cliente";
import { Page } from "app/model/common/page";
import { Venda } from "app/model/vendas";
import { useClienteService } from "app/service";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { useState } from "react";
interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
  cliente: undefined,
  produtos: [],
  total: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  const clienteService = useClienteService();
  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });
  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formScheme,
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
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="cliente">Cliente: *</label>
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
        <Button type="submit" label="Finalizar" />
      </div>
    </form>
  );
};
