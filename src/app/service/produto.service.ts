import { httpClient } from "app/http";
import { Produto } from "app/model/produto";
import { AxiosResponse } from "axios";
const resourceURL: string = "/api/produtos";

export const useProdutoService = () => {
  const salvar = async (produto: Produto): Promise<Produto> => {
    const response: AxiosResponse<Produto> = await httpClient.post<Produto>(
      resourceURL,
      produto
    );
    return response.data;
  };

  const atualizar = async (produto: Produto): Promise<void> => {
    const url: string = `${resourceURL}/${produto.id}`;
    httpClient.put<Produto>(url, produto);
  };

  const carregarProduto = async (id: string): Promise<Produto> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Produto> = await httpClient.get<Produto>(url);
    return response.data;
  };

  const deletar = async (id: string): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  return {
    salvar,
    atualizar,
    carregarProduto,
    deletar,
  };
};
