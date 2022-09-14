import { Cliente } from "../cliente";
import { Produto } from "../produto";

export interface Venda {
  cliente?: Cliente;
  produtos?: Array<Produto>;
  formaPagamento?: string;
  total: number;
}
