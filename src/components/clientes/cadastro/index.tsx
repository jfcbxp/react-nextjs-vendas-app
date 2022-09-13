import { Layout } from "components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/model/cliente";
import { useState } from "react";
import { useClienteService } from "app/service";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const service = useClienteService();

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      service.atualizar(cliente).then((response) => {
        console.log("atualizado");
      });
    } else {
      service.salvar(cliente).then((response) => {
        setCliente(response);
        console.log("cadastrado");
      });
    }
  };

  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
