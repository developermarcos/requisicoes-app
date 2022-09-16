import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioLogadoResolver implements Resolve<Funcionario> {

  constructor(
    private funcionarioService : FuncionarioService,
    private authServie : AuthenticationService
  ){}
  resolve(): Observable<Funcionario> {
    return this.authServie.usuarioLogado
    .pipe(
      switchMap(usuario => this.funcionarioService.selecionarPorEmail(usuario?.email!)),
      take(1)
    )
  }
}
