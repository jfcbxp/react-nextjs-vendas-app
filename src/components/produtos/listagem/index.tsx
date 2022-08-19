import { Layout } from "components/layout";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/model/produto";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

export const ListagemProdutos: React.FC = () => {
  const { data: result, error } = useSWR<AxiosResponse<Array<Produto>>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  if (!result) {
    return <div>Carregando</div>;
  }

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning"> Novo</button>
      </Link>
      <TabelaProdutos produtos={result.data}></TabelaProdutos>
    </Layout>
  );
};
