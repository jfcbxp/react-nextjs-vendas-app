import { Layout, Input } from "components";
import { useState } from "react";
import { useProdutoService } from "app/service";
import { Produto } from "app/model/produto";
import { Alert } from "components/common/message";

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id, setID] = useState<string | undefined>("");
  const [dataCadastro, setDataCadastro] = useState<string | undefined>("");
  const [messagens, setMessages] = useState<Array<Alert>>([]);
  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: parseFloat(preco),
      nome,
      descricao,
    };

    if (id) {
      service.atualizar(produto).then(() => {
        setMessages([
          { tipo: "success", texto: "Produto atualizado com sucesso!" },
        ]);
      });
    } else {
      service.salvar(produto).then((response) => {
        setID(response.id);
        setDataCadastro(response.dataCadastro);
        setMessages([
          { tipo: "success", texto: "Produto cadastrado com sucesso!" },
        ]);
      });
    }
  };

  return (
    <Layout titulo="Cadastro de Produtos" mensagens={messagens}>
      {id && (
        <div className="columns">
          <Input
            label="Codigo:"
            columnClasses="is-half"
            id="inputCodigo"
            value={id}
            disabled
          />

          <Input
            label="Data Cadastro:"
            columnClasses="is-half"
            id="inputDataCadastro"
            value={dataCadastro}
            disabled
          />
        </div>
      )}
      <div className="columns">
        <Input
          label="SKU: *"
          columnClasses="is-half"
          id="inputSKU"
          value={sku}
          onChange={setSku}
          placeholder="Digite o SKU do produto"
        />

        <Input
          label="Preço: *"
          columnClasses="is-half"
          id="inputPreco"
          value={preco}
          onChange={setPreco}
          currency
          placeholder="Digite o Preço"
        />
      </div>
      <div className="columns">
        <Input
          label="Nome: *"
          columnClasses="is-full"
          id="inputNome"
          value={nome}
          onChange={setNome}
          placeholder="Digite o Nome do produto"
        />
      </div>
      <div className="columns">
        <div className="field is-full column">
          <label htmlFor="inputDesc">Descrição: *</label>
          <div className="control">
            <textarea
              className="input"
              id="inputDesc"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Digite a descrição do produto"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={submit}>
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <button className="button">Voltar</button>
        </div>
      </div>
    </Layout>
  );
};
