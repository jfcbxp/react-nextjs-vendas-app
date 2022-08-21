import { Produto } from "app/model/produto";

interface TabelaProdutosProps {
  produtos: Array<Produto>;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onEdit,
  onDelete,
}) => {
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
          <ProdutoRow
            onEdit={onEdit}
            onDelete={onDelete}
            key={produto.id}
            produto={produto}
          />
        ))}
      </tbody>
    </table>
  );
};

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        <button
          onClick={(e) => onEdit(produto)}
          className="button is-success is-rounded is-small"
        >
          Editar
        </button>
        <button
          onClick={(e) => onDelete(produto)}
          className="button is-danger is-rounded is-small"
        >
          Deletar
        </button>
      </td>
    </tr>
  );
};
