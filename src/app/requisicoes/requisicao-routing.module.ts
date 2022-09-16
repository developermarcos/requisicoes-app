import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioLogadoResolver } from '../shared/services/funcionario-logado.resolver';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RequisicaoFuncionarioComponent } from './requisicao-funcionario/requisicao-funcionario.component';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';
import { RequisicaoResolver } from './services/requisicao.resolver';

const routes: Routes = [
  {
    path: '', 
    component : RequisicaoComponent,
    children: [
      {path: "", redirectTo: "funcionario", pathMatch: "full"},
      {path: 'funcionario' , component: RequisicaoFuncionarioComponent, resolve: {funcionarioLogado: FuncionarioLogadoResolver}},
      {path: 'departamento' , component: RequisicoesDepartamentoComponent, resolve: {funcionarioLogado: FuncionarioLogadoResolver}},
    ]
  },{ path: ":id" , component: DetalhesComponent, resolve: {requisicao: RequisicaoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
