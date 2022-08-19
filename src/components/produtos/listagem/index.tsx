import { Layout, Loader } from "components";
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

  return (
    <Layout titulo="Produtos">
      <Loader show={!result} />
      <Link href="/cadastros/produtos">
        <button className="button is-warning"> Novo</button>
      </Link>

      <TabelaProdutos produtos={result?.data || []} />
    </Layout>
  );
};
