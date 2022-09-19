import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { VendaPorMes } from "app/model/dashboard";
import {MESES} from "app/util/meses"

interface DashboardProps {
  clientes?: number;
  produtos?: number;
  vendas?: number;
  vendasPorMes?: VendaPorMes[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  clientes,
  produtos,
  vendas,
  vendasPorMes,
}) => {
  const [chartData, setChartData] = useState({});

  const carregaDadosChart = () => {
    const labels: string[] = vendasPorMes
      ? vendasPorMes.map((vm) => MESES[vm.mes - 1])
      : [];
    const valores = vendasPorMes?.map((vm) => vm.valor);
    const dadosGrafico = {
      labels: labels,
      datasets: [
        { label: "Valor Mensal", backgroundColor: "#42A5F5", data: valores },
      ],
    };
    setChartData(dadosGrafico);
  };

  useEffect(carregaDadosChart, []);

  const produtoCardStyle = {
    background: "red",
    color: "white",
  };

  const clienteCardStyle = {
    background: "blue",
    color: "white",
  };

  const vendaCardStyle = {
    background: "green",
    color: "white",
  };

  return (
    <div className="p-fluid">
      <div className="grid">
        <div className="col-4">
          <Card title="Produtos" style={produtoCardStyle}>
            <p className="p-m-0">{produtos}</p>
          </Card>
        </div>
        <div className="col-4">
          <Card title="Clientes" style={clienteCardStyle}>
            <p className="p-m-0">{clientes}</p>
          </Card>
        </div>
        <div className="col-4">
          <Card title="Vendas" style={vendaCardStyle}>
            <p className="p-m-0">{vendas}</p>
          </Card>
        </div>
      </div>
      <div className="grid">
        <div className="col-12">
          <Chart
            type="bar"
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
};
