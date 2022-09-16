import { Venda } from "app/model/vendas";
import { Layout } from "components/layout";
import { VendasForm } from "./form";
import { useVendaService } from "app/service";
import { Alert } from "components/common/message";
import { useState } from "react";

export const Vendas: React.FC = () => {
  const service = useVendaService();
  const [messages, setMessages] = useState<Alert[]>([]);
  const [vendaRealizada, setVendaRealizada] = useState<boolean>(false);

  const handleSubmit = (venda: Venda) => {
    service
      .salvar(venda)
      .then((response) => {
        setVendaRealizada(true);
        setMessages([
          {
            texto: "Venda realizada com sucesso!",
            tipo: "success",
          },
        ]);
      })
      .catch((error) => {
        setMessages([
          {
            texto: "Ocorreu um erro!",
            tipo: "danger",
          },
        ]);
      });
  };
  const handleNovaVenda = () => {
    setMessages([]);
    setVendaRealizada(false);
  };
  return (
    <Layout titulo="Vendas">
      <VendasForm
        onSubmit={handleSubmit}
        onNovaVenda={handleNovaVenda}
        vendaRealizada={vendaRealizada}
      />
    </Layout>
  );
};
