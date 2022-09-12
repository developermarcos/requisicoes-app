import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, Subscription, take } from 'rxjs';
import { Departamento } from 'src/app/departamentos/models/departamento.model';
import { DepartamentoService } from 'src/app/departamentos/services/departamento.service';
import { Equipamento } from 'src/app/equipamentos/model/equipamento.model';
import { EquipamentoService } from 'src/app/equipamentos/services/departamento.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario.model';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Requisicao } from '../model/requisicao.model';
import { RequisicaoService } from '../services/requisicao.service';

@Component({
  selector: 'app-requisicoes-departamento',
  templateUrl: './requisicoes-departamento.component.html'
})
export class RequisicoesDepartamentoComponent implements OnInit, OnDestroy {

  public requisicoes$ : Observable<Requisicao[]>
  public departamentos$ : Observable<Departamento[]>
  public equipamentos$ : Observable<Equipamento[]>
  public funcionarios$ : Observable<Funcionario[]>
  public form : FormGroup;
  emailUsuario? : string | null;
  usuarioLogado$ : Subscription;
  idFuncionarioLogado : string;
  departamentoIdUsuarioLogado? : string;
  departamentoUsuarioLogado? : Departamento;
  constructor(
    private modalService : NgbModal,
    private fb : FormBuilder,
    private requisicaoService : RequisicaoService,
    private notification : NotificationService,
    private departamentoService : DepartamentoService,
    private funcionarioService : FuncionarioService,
    private equipamentoService : EquipamentoService,
    private authService : AuthenticationService
  ) { }
  ngOnDestroy(): void {
    this.usuarioLogado$.unsubscribe();
  }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.equipamentos$ = this.equipamentoService.selecionarTodos();
    
    this.form = this.fb.group({
      id: new FormControl(""),
      descricao: new FormControl(""),
      dataAbertura: new FormControl(""),
      status: new FormControl(""),

      funcionarioId : new FormControl(""),
      funcionario : new FormControl(""),

      departamentoId : new FormControl(""),
      departamento : new FormControl(""),

      equipamentoId : new FormControl(""),
      equipamento : new FormControl(""),
    });
    
    this.usuarioLogado$ = this.authService.usuarioLogado.subscribe(usuario => {
        this.emailUsuario = usuario?.email!

        this.funcionarioService.selecionarPorEmail(this.emailUsuario)
        .subscribe(funcionarioEncotrado => {
          this.idFuncionarioLogado = funcionarioEncotrado.id;

          this.funcionarioService.selecionarDepartamentoIdFuncionarioPorFuncionarioId(this.idFuncionarioLogado)
          .subscribe(departamentoId => {
            if(departamentoId){
              this.departamentoIdUsuarioLogado = departamentoId;
              this.requisicoes$ = this.requisicaoService.selecionarRequisicoesPorDepartamento(departamentoId);
              this.departamentoService.selecionarPorId(departamentoId)
                .subscribe(departamento => {
                  this.departamentoUsuarioLogado = departamento;
                });
            }
          });
        });
    });
  }

  get departamentoNome() : string{
    return this.departamentoUsuarioLogado ? this.departamentoUsuarioLogado?.nome : "";
  }
  // GET
  get tituloModal() : string{
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id() : AbstractControl | null{
    return this.form.get('id');
  }
  get descricao() : AbstractControl | null{
    return this.form.get('descricao');
  }
  get dataAbertura() : AbstractControl | null{
    return this.form.get('dataAbertura');
  }
  get status() : AbstractControl | null{
    return this.form.get('status');
  }
  get funcionarioId() : AbstractControl | null{
    return this.form.get('funcionarioId');
  }
  get funcionario() : AbstractControl | null{
    return this.form.get('funcionario');
  }
  get departamentoId(){
    return this.form.get('departamentoId');
  }
  get departamento() : AbstractControl | null{
    return this.form.get('departamento');
  }
  get equipamentoId() : AbstractControl | null{
    return this.form.get('equipamentoId');
  }
  get equipamento() : AbstractControl | null{
    return this.form.get('equipamento');
  }

  // END GET

}
