import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { DashboardData } from "app/model/dashboard";
const resourceURL: string = "/api/dashboard";

export const useDashboardService = () => {
  const totais = async (): Promise<DashboardData> => {
    const response: AxiosResponse<DashboardData> =
      await httpClient.get<DashboardData>(resourceURL);
    return response.data;
  };

  return {
    totais,
  };
};
