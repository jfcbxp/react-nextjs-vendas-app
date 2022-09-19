import Head from "next/head";
import { Layout, Dashboard } from "components";
import { useDashboardService } from "app/service";
import { DashboardData } from "app/model/dashboard";

const Home: React.FC = (props: any) => {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo="Dashboard">
        <Dashboard
          clientes={props.dashboard.clientes}
          produtos={props.dashboard.produtos}
          vendas={props.dashboard.vendas}
        />
      </Layout>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const service = useDashboardService();
  const dashboard: DashboardData = await service.totais();
  return {
    props: {
      dashboard,
    },
    revalidate: 60,
  };
}

export default Home;
