import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequisicaoFuncionarioComponent } from './requisicao-funcionario/requisicao-funcionario.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RequisicoesFuncionarioListComponent } from './requisicao-funcionario/requisicoes-funcionario-list/requisicoes-funcionario-list.component';


@NgModule({
  declarations: [
    RequisicaoComponent,
    RequisicaoFuncionarioComponent,
    RequisicoesDepartamentoComponent,
    DetalhesComponent,
    RequisicoesFuncionarioListComponent
  ],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
  ]
})
export class RequisicaoModule { }
