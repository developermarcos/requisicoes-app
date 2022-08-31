import { Departamento } from "src/app/departamentos/models/departamento.model";

export class Funcionario{
  id : string;
  nome : string;
  funcao : string;
  email : string;
  departamento : Departamento

  constructor(nome : string, funcao : string, email : string, departamento : Departamento){
    this.nome = nome;
    this.funcao = funcao;
    this.email = email;
    this.departamento = departamento;
  }
}