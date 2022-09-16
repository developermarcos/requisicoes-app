import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoStatus } from '../../model/requisicao-status.enum';
import { Requisicao } from '../../model/requisicao.model';

@Component({
  selector: 'app-requisicoes-funcionario-list',
  templateUrl: './requisicoes-funcionario-list.component.html'
})
export class RequisicoesFuncionarioListComponent implements OnInit {
  
  @Input() requisicoes$ : Observable<Requisicao[]>
  @Input() requisicaoAberta : RequisicaoStatus = RequisicaoStatus.Aberta

  @Output() public eventExcluir = new EventEmitter<any>();
  @Output() public eventEditar = new EventEmitter<any>();

  excluir(requisicaoExcluir : Requisicao){
    this.eventExcluir.emit({requisicao: requisicaoExcluir});
  }
  editar(requisicaoEditar : Requisicao){
    this.eventEditar.emit({requisicao: requisicaoEditar});
  }

  constructor() { }

  ngOnInit(): void { }
}
