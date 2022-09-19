import { httpClient } from "app/http";
import { Venda } from "app/model/vendas";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/vendas";

export const useVendaService = () => {
  const salvar = async (venda: Venda): Promise<Venda> => {
    const response: AxiosResponse<Venda> = await httpClient.post<Venda>(
      resourceURL,
      venda
    );
    return response.data;
  };

  const gerarRelatorio = async (
    idCliente: string = "",
    dataInicio: string = "",
    dataFim: string = ""
  ): Promise<Blob> => {
    const response: AxiosResponse = await httpClient.get(
      `${resourceURL}/relatorio-vendas?id=${idCliente}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
      { responseType: "blob" }
    );
    return new Blob([response.data], { type: "application/pdf" });
  };

  return {
    salvar,
    gerarRelatorio,
  };
};
