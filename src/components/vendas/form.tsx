import { FocusEvent, useState } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import {
  AutoComplete,
  AutoCompleteChangeParams,
  AutoCompleteCompleteMethodParams,
} from "primereact/autocomplete";
import { Cliente } from "app/model/cliente";
import { Page } from "app/model/common/page";
import { ItemVenda, Venda } from "app/model/vendas";
import { Produto } from "app/model/produto";
import { useClienteService, useProdutoService } from "app/service";
import { validationScheme } from "./validationScheme";

const formatMoney = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
  cliente: undefined,
  itens: [],
  total: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  const formasPagamento: String[] = ["DINHEIRO", "CARTAO"];
  const clienteService = useClienteService();
  const produtoService = useProdutoService();
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [listaProdutosFiltrada, setListaProdutosFiltrada] = useState<Produto[]>(
    []
  );
  const [mensagem, setMensagem] = useState<string>("");
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [produto, setProduto] = useState<Produto>();
  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });
  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formScheme,
    validationSchema: validationScheme,
  });

  const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
    const nome = e.query;
    clienteService
      .listar(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  const handleClienteChange = (e: AutoCompleteChangeParams) => {
    const clienteSelecionado: Cliente = e.value;
    formik.setFieldValue("cliente", clienteSelecionado);
  };

  const handleCodigoProdutoChange = (e: FocusEvent<HTMLInputElement>) => {
    produtoService
      .carregarProduto(codigoProduto)
      .then((produtoSelecionado) => setProduto(produtoSelecionado))
      .catch((error) => {
        setMensagem("Produto não encontrado");
        setProduto(undefined);
        setCodigoProduto("");
        setQuantidadeProduto(1);
      });
  };

  const handleAddProduto = () => {
    const itensAdicionados = formik.values.itens;
    const itemJaExiste = itensAdicionados?.some((item: ItemVenda) => {
      return item.produto.id == produto?.id;
    });

    if (itemJaExiste) {
      itensAdicionados?.forEach((item: ItemVenda) => {
        if (item.produto.id == produto?.id) {
          item.quantidade = item.quantidade + quantidadeProduto;
        }
      });
    } else {
      produto &&
        itensAdicionados?.push({
          produto: produto,
          quantidade: quantidadeProduto,
        });
    }
    setProduto(undefined);
    setCodigoProduto("");
    setQuantidadeProduto(1);
    const total = totalVenda();
    formik.setFieldValue("total", total);
  };

  const handleProdutoChange = (e: AutoCompleteChangeParams) => {
    const produtoSelecionado: Produto = e.value;
    setProduto(produtoSelecionado);
  };

  const handleProdutoAutoComplete = async (
    e: AutoCompleteCompleteMethodParams
  ) => {
    if (!listaProdutos.length) {
      await produtoService.listar().then((produtosEncontrados) => {
        setListaProdutos(produtosEncontrados);
      });
    }
    const produtosEncontrados = listaProdutos.filter((produto: Produto) => {
      return produto.nome?.toUpperCase().includes(e.query.toUpperCase());
    });
    setListaProdutosFiltrada(produtosEncontrados);
  };
  const disableAddProdutoButton = () => {
    return !produto || !quantidadeProduto;
  };

  const totalVenda = () => {
    const totais: number[] = formik.values.itens
      ? formik.values.itens.map((item) =>
          item.produto.preco ? item.quantidade * item.produto.preco : 0
        )
      : [0];
    if (totais.length) {
      return totais.reduce(
        (somatoriaAtual = 0, valorItemAtual) => somatoriaAtual + valorItemAtual
      );
    } else {
      return 0;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="grid">
          <div className="col-12">
            <label htmlFor="cliente">Cliente: *</label>
            <AutoComplete
              suggestions={listaClientes.content}
              completeMethod={handleClienteAutoComplete}
              value={formik.values.cliente}
              field="nome"
              id="cliente"
              name="cliente"
              onChange={handleClienteChange}
            />
            <small className="p-error p-d-block">{formik.errors.cliente}</small>
          </div>
          <div className="col-2">
            <span className="p-float-label">
              <InputText
                onBlur={handleCodigoProdutoChange}
                value={codigoProduto}
                id="codigoProduto"
                onChange={(e) => setCodigoProduto(e.target.value)}
              />
              <label htmlFor="codigoProduto">Codigo</label>
            </span>
          </div>
          <div className="col-6">
            <AutoComplete
              completeMethod={handleProdutoAutoComplete}
              id="produto"
              name="produto"
              value={produto}
              field="nome"
              suggestions={listaProdutosFiltrada}
              onChange={handleProdutoChange}
            />
          </div>
          <div className="col-2">
            <span className="p-float-label">
              <InputText
                id="qtdProduto"
                value={quantidadeProduto}
                onChange={(e) => setQuantidadeProduto(parseInt(e.target.value))}
              />
              <label htmlFor="qtdProduto">Qtd</label>
            </span>
          </div>
          <div className="col-2">
            <Button
              type="button"
              label="Adicionar"
              disabled={disableAddProdutoButton()}
              onClick={handleAddProduto}
            />
          </div>
          <div className="col-12">
            <DataTable
              value={formik.values.itens}
              emptyMessage="Nenhum produto adicionado"
            >
              <Column
                body={(item: ItemVenda) => {
                  const handleRemoverItem = () => {
                    const novaLista = formik.values.itens?.filter(
                      (iv) => iv.produto.id != item.produto.id
                    );
                    formik.setFieldValue("itens", novaLista);
                  };

                  return (
                    <div>
                      <Button
                        type="button"
                        onClick={handleRemoverItem}
                        label="Excluir"
                      />
                    </div>
                  );
                }}
              />
              <Column field="produto.id" header="Codigo" />
              <Column field="produto.sku" header="Sku" />
              <Column field="produto.nome" header="Produto" />
              <Column field="produto.preco" header="Und" />
              <Column field="quantidade" header="Qtd" />
              <Column
                body={(item: ItemVenda) => {
                  return (
                    <div>
                      {item.produto.preco &&
                        formatMoney.format(
                          item.produto.preco * item.quantidade
                        )}
                    </div>
                  );
                }}
                header="Total"
              />
            </DataTable>
            <small className="p-error p-d-block">
              {formik.touched && formik.errors.itens}
            </small>
          </div>
          <div className="col-5">
            <div className="p-field">
              <label>Forma de Pagamento: *</label>
              <Dropdown
                id="formaPagamento"
                options={formasPagamento}
                value={formik.values.formaPagamento}
                onChange={(e) =>
                  formik.setFieldValue("formaPagamento", e.value)
                }
                placeholder="Selecione..."
              />
              <small className="p-error p-d-block">
                {formik.touched && formik.errors.formaPagamento}
              </small>
            </div>
          </div>
          <div className="col-2">
            <div className="p-field">
              <label htmlFor="itens">Itens:</label>
              <InputText disabled value={formik.values.itens?.length} />
            </div>
          </div>
          <div className="col-2">
            <div className="p-field">
              <label htmlFor="total">Total:</label>
              <InputText
                disabled
                value={formatMoney.format(formik.values.total)}
              />
            </div>
          </div>
        </div>

        <Button type="submit" label="Finalizar" />
      </div>
      <Dialog
        position="top"
        header="Atenção!"
        closable
        visible={!!mensagem}
        onHide={() => setMensagem("")}
      >
        {mensagem}
      </Dialog>
    </form>
  );
};
