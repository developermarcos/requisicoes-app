import { Departamento } from "src/app/departamentos/models/departamento.model";
import { Equipamento } from "src/app/equipamentos/model/equipamento.model";
import { Funcionario } from "src/app/funcionarios/models/funcionario.model";

export class Requisicao{
  id : string;
  descricao : string;
  funcionarioId? : string;
  funcionario? : Funcionario;
  departamentoId? : string;
  departamento? : Departamento;
  dataAbertura : String;
  equipamentoId? : string;
  equipamento? : Equipamento;
}