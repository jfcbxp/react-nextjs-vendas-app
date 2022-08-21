import { Layout, Loader } from "components";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/model/produto";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import Router from "next/router";

export const ListagemProdutos: React.FC = () => {
  const { data: result, error } = useSWR<AxiosResponse<Array<Produto>>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    Router.push(url)
  };

  const deletar = (produto: Produto) => {
    console.log(produto);
  };

  return (
    <Layout titulo="Produtos">
      <Loader show={!result} />
      <Link href="/cadastros/produtos">
        <button className="button is-warning"> Novo</button>
      </Link>
      <br />
      <br />

      <TabelaProdutos
        onEdit={editar}
        onDelete={deletar}
        produtos={result?.data || []}
      />
    </Layout>
  );
};
