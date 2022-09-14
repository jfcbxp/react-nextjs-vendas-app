import { Venda } from "app/model/vendas";
import { Layout } from "components/layout";
import { VendasForm } from "./form";

export const Vendas: React.FC = () => {
  const handleSubmit = (venda: Venda) => {
    console.log(venda);
  };
  return (
    <Layout titulo="Vendas">
      <VendasForm onSubmit={handleSubmit} />
    </Layout>
  );
};
