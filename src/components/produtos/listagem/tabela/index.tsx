import { Produto } from "app/model/produto";

interface TabelaProdutosProps {
  produtos: Array<Produto>;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos }) => {
  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Sku</th>
          <th>Nome</th>
          <th>Preço</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <ProdutoRow key={produto.id} produto={produto} />
        ))}
      </tbody>
    </table>
  );
};

interface ProdutoRowProps {
  produto: Produto;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto }) => {
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        <button className="button is-success"> Editar</button>
        <button className="button is-danger"> Deletar</button>
      </td>
    </tr>
  );
};
