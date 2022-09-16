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
  return {
    salvar,
  };
};
