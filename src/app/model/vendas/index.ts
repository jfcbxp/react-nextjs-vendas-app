import { Cliente } from "../cliente";
import { Produto } from "../produto";

export interface Venda {
  cliente?: Cliente;
  itens?: Array<ItemVenda>;
  formaPagamento?: string;
  total: number;
}

export interface ItemVenda {
  produto: Produto;
  quantidade: number;
}
