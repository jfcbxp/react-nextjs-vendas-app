import { Layout } from "components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/model/cliente";
import { useState } from "react";
import { useClienteService } from "app/service";
import { Alert } from "components/common/message";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const [messagens, setMessages] = useState<Array<Alert>>([]);
  const service = useClienteService();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id &&
      service
        .carregarCliente(id as string)
        .then((clienteEncontrado) => setCliente(clienteEncontrado));
  }, [id]);

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      service.atualizar(cliente).then((response) => {
        setMessages([
          { tipo: "success", texto: "Cliente atualizado com sucesso!" },
        ]);
      });
    } else {
      service.salvar(cliente).then((response) => {
        setCliente(response);
        setMessages([
          { tipo: "success", texto: "Cliente cadastrado com sucesso!" },
        ]);
      });
    }
  };

  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
