import { httpClient } from "app/http";
import { Cliente } from "app/model/cliente";
import { AxiosResponse } from "axios";
import { Page } from "app/model/common/page";

const resourceURL: string = "/api/clientes";

export const useClienteService = () => {
  const salvar = async (cliente: Cliente): Promise<Cliente> => {
    const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>(
      resourceURL,
      cliente
    );
    return response.data;
  };

  const atualizar = async (cliente: Cliente): Promise<void> => {
    const url: string = `${resourceURL}/${cliente.id}`;
    httpClient.put<Cliente>(url, cliente);
  };

  const carregarCliente = async (id: string): Promise<Cliente> => {
    const url: string = `${resourceURL}/${id}`;
    const response: AxiosResponse<Cliente> = await httpClient.get<Cliente>(url);
    return response.data;
  };

  const deletar = async (id: string): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await httpClient.delete(url);
  };

  const listar = async (
    nome: string = "",
    cpf: string = "",
    page: number = 0,
    size: number = 10
  ): Promise<Page<Cliente>> => {
    const url: string = `${resourceURL}?nome=${nome}&cpf=${cpf}&page=${page}&size=${size}`;
    const response: AxiosResponse<Page<Cliente>> = await httpClient.get<
      Page<Cliente>
    >(url);
    return response.data;
  };

  return {
    salvar,
    atualizar,
    carregarCliente,
    deletar,
    listar,
  };
};
