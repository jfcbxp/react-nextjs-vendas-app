import { Produto } from "app/model/produto";
import { useState } from "react";

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
  const [deletando, setDeletando] = useState<boolean>(false);

  const onDeleteProduto = (produto: Produto) => {
    if (deletando) {
      onDelete(produto);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        {!deletando && (
          <button
            onClick={(e) => onEdit(produto)}
            className="button is-success is-rounded is-small"
          >
            Editar
          </button>
        )}

        {deletando && (
          <button
            onClick={(e) => cancelaDelete()}
            className="button is-success is-rounded is-small"
          >
            Cancelar
          </button>
        )}
        <button
          onClick={(e) => onDeleteProduto(produto)}
          className="button is-danger is-rounded is-small"
        >
          {deletando ? "Confirma?" : "Deletar"}
        </button>
      </td>
    </tr>
  );
};
