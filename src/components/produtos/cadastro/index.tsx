import { Layout, Input } from "components";
import { useState, useEffect } from "react";
import { useProdutoService } from "app/service";
import { Produto } from "app/model/produto";
import { Alert } from "components/common/message";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

const MSG_CAMPO_OBRIGATORIO = "Campo obrigatorio";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(MSG_CAMPO_OBRIGATORIO),
  nome: yup.string().trim().required(MSG_CAMPO_OBRIGATORIO),
  descricao: yup
    .string()
    .trim()
    .required(MSG_CAMPO_OBRIGATORIO)
    .min(10, "Deve possuir pelo menos 10 caracteres"),
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
  const [sku, setSku] = useState<string | undefined>("");
  const [preco, setPreco] = useState<string | undefined>("");
  const [nome, setNome] = useState<string | undefined>("");
  const [descricao, setDescricao] = useState<string | undefined>("");
  const [id, setID] = useState<string | undefined>("");
  const [dataCadastro, setDataCadastro] = useState<string | undefined>("");
  const [messagens, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<FormErros>({});
  const router = useRouter();
  const { id: urlId } = router.query;

  useEffect(() => {
    if (urlId) {
      let idProduto = urlId.toString();
      service.carregarProduto(idProduto).then((produtoEncontrado) => {
        setID(produtoEncontrado.id);
        setSku(produtoEncontrado.sku);
        setNome(produtoEncontrado.nome);
        setDescricao(produtoEncontrado.descricao);
        setPreco(produtoEncontrado.preco?.toString());
        setDataCadastro(produtoEncontrado.dataCadastro);
      });
    }
  }, [urlId]);

  const submit = () => {
    let precoProduto = preco ? preco : "0";

    const produto: Produto = {
      id,
      sku,
      preco: parseFloat(precoProduto),
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
          onChange={(e) => setSku(e.target.value)}
          placeholder="Digite o SKU do produto"
          error={errors.sku}
        />

        <Input
          label="Preço: *"
          columnClasses="is-half"
          id="inputPreco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
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
          onChange={(e) => setNome(e.target.value)}
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
          <Link href="/consultas/produtos">
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
