import { Departamento } from "src/app/departamentos/models/departamento.model";
import { Equipamento } from "src/app/equipamentos/model/equipamento.model";
import { Funcionario } from "src/app/funcionarios/models/funcionario.model";
import { RequisicaoStatus } from "./requisicao-status.enum";

export class Requisicao{
  id : string;
  descricao : string;
  dataAbertura : Date | any;
  status: RequisicaoStatus

  funcionarioId? : string;
  funcionario? : Funcionario;

  departamentoId? : string;
  departamento? : Departamento;
  
  equipamentoId? : string;
  equipamento? : Equipamento;
}