import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PainelComponent } from './painel/painel.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginGuard } from './shared/auth/login.guard';

const routes: Routes = [
  { path : "" , redirectTo : "login", pathMatch : 'full' },
  { path : "login" , component : LoginComponent, canActivate : [LoginGuard] },
  { path : "painel" , component : PainelComponent, canActivate: [AuthGuard] },
  { 
    path:"departamentos" ,  
    loadChildren : () => import("./departamentos/departamento.module")
      .then(m => m.DepartamentoModule),
    canActivate: [AuthGuard]
  },
  { 
    path:"equipamentos" ,  
    loadChildren : () => import("./equipamentos/equipamento.module")
      .then(m => m.EquipamentoModule),
    canActivate: [AuthGuard]
  },
  { 
    path:"funcionarios" ,  
    loadChildren : () => import("./funcionarios/funcionario.module")
      .then(m => m.FuncionarioModule),
    canActivate: [AuthGuard]
  },
  { 
    path:"requisicoes" ,  
    loadChildren : () => import("./requisicoes/requisicao.module")
      .then(m => m.RequisicaoModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
