import { Produto } from "app/model/produto";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

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
  const actionTemplate = (registro: Produto) => {
    const url = `/cadastros/produtos?id=${registro.id}`;
    return (
      <div>
        <Button
          label="Editar"
          className="p-button-rounded p-button-info"
          onClick={(e) => onEdit(registro)}
        />
        <Button
          label="Deletar"
          onClick={(e) => {
            confirmDialog({
              message: "cofirma a exclusão desse registro",
              acceptLabel: "Sim",
              rejectLabel: "Não",
              accept: () => onDelete(registro),
            });
          }}
          className="p-button-rounded p-button-danger"
        />
      </div>
    );
  };
  return (
    <DataTable value={produtos} paginator rows={5}>
      <Column field="id" header="Codigo" />
      <Column field="sku" header="Sku" />
      <Column field="nome" header="Nome" />
      <Column field="preco" header="Preço" />
      <Column header="" body={actionTemplate} />
    </DataTable>
  );
};
