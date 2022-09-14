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

  @Output() public eventExcluir = new EventEmitter<Requisicao>();

  excluir(requisicaoExcluir : Requisicao){
    this.eventExcluir.emit(requisicaoExcluir);
  }

  constructor() { }

  ngOnInit(): void { }
}
