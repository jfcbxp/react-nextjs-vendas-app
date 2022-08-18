import { Layout, Input } from "components";
import { useState } from "react";
import { useProdutoService } from "app/service";
import { Produto } from "app/model/produto";
import { Alert } from "components/common/message";
import * as yup from "yup";

const MSG_CAMPO_OBRIGATORIO = "Campo obrigatorio";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(MSG_CAMPO_OBRIGATORIO),
  nome: yup.string().trim().required(MSG_CAMPO_OBRIGATORIO),
  descricao: yup
    .string()
    .trim()
    .required(MSG_CAMPO_OBRIGATORIO)
    .length(10, "Deve possuir pelo menos 10 caracteres"),
  //  preco: yup.number().required(MSG_CAMPO_OBRIGATORIO).moreThan(0,"Valor deve ser maior que zero")
});

interface FormErros {
  sku?: string;
  nome?: string;
  preco?: string;
  descricao?: string;
}

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id, setID] = useState<string | undefined>("");
  const [dataCadastro, setDataCadastro] = useState<string | undefined>("");
  const [messagens, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<FormErros>({});
  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: parseFloat(preco),
      nome,
      descricao,
    };

    validationSchema
      .validate(produto)
      .then((obj) => {
        setErrors({});
        setMessages([]);
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
      })
      .catch((error) => {
        const field = error.path;
        const message = error.message;
        console.log(error);
        setErrors({
          [field]: message,
        });
        setMessages([
          {
            tipo: "danger",
            field,
            texto: message,
          },
        ]);
      });
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
          error={errors.sku}
        />

        <Input
          label="Preço: *"
          columnClasses="is-half"
          id="inputPreco"
          value={preco}
          onChange={setPreco}
          currency
          placeholder="Digite o Preço"
          error={errors.preco}
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
          error={errors.nome}
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
            {errors.descricao && (
              <p className="help is-danger">{errors.descricao}</p>
            )}
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
