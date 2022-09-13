import { RequisicaoStatus } from "./requisicao-status.enum";

export class Movimentacao{
  status : RequisicaoStatus;
  data : Date | any;
  mensagem : string;
}