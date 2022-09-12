import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequisicaoFuncionarioComponent } from './requisicao-funcionario/requisicao-funcionario.component';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';

const routes: Routes = [
  {
    path: '', 
    component : RequisicaoComponent,
    children: [
      {path: "", redirectTo: "funcionario", pathMatch: "full"},
      {path: 'funcionario' , component: RequisicaoFuncionarioComponent},
      {path: 'departamento' , component: RequisicoesDepartamentoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
