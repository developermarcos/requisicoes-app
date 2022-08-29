import { Timestamp } from "rxjs";

export class Equipamento{
  id : string;
  numeroSerie : string;
  nome : string;
  precoAquisicao : number;
  dataFabricacao : Date;
  
  constructor(numeroSerie : string, nome : string, precoAquisicao : number, dataFabricacao : Date){
    this.numeroSerie = numeroSerie;
    this.nome = nome;
    this.precoAquisicao = precoAquisicao;
    this.dataFabricacao = dataFabricacao;
  }
}