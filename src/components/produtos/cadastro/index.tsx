import { Layout, Input } from "components";
import { useState } from "react";

export const CadastroProdutos: React.FC = () => {
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");

  const submit = () => {
    const produto = {
      sku,
      preco,
      nome,
      descricao,
    };
  };

  return (
    <Layout titulo="Cadastro de Produtos">
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
              onChange={(event) => setSku(event.target.value)}
              placeholder="Digite a descrição do produto"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={submit}>
            Salvar
          </button>
        </div>
        <div className="control">
          <button className="button">Voltar</button>
        </div>
      </div>
    </Layout>
  );
};
