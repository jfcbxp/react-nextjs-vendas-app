import { Layout, Loader } from "components";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import { Produto } from "app/model/produto";
import useSWR from "swr";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import Router from "next/router";
import { useProdutoService } from "app/service";
import { Alert } from "components/common/message";
import { useState, useEffect } from "react";

export const ListagemProdutos: React.FC = () => {
  const service = useProdutoService();
  const [messagens, setMessages] = useState<Array<Alert>>([]);
  const [lista, setLista] = useState<Produto[]>([]);

  const { data: result, error } = useSWR<AxiosResponse<Array<Produto>>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    Router.push(url);
  };

  const deletar = (produto: Produto) => {
    if (produto.id) {
      service.deletar(produto.id).then((response) => {
        setMessages([
          { tipo: "success", texto: "Produto excluido com sucesso!" },
        ]);
        const listaAlterada = lista?.filter((p) => p.id !== produto.id);
        setLista(listaAlterada);
      });
    }
  };

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  return (
    <Layout titulo="Produtos" mensagens={messagens}>
      <Loader show={!result} />
      <Link href="/cadastros/produtos">
        <button className="button is-warning"> Novo</button>
      </Link>
      <br />
      <br />

      <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista} />
    </Layout>
  );
};
