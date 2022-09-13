import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
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
import { MessageType } from 'src/app/shared/notification/model/message-type.notification.enum';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Movimentacao } from '../model/movimentacao.model';
import { RequisicaoStatus } from '../model/requisicao-status.enum';
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
  public requisicaoEditada : Requisicao;

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
      status: new FormControl(""),
      mensagem: new FormControl(""),
      data: new FormControl(""),
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

  // GET
  get departamentoNome() : string{
    return this.departamentoUsuarioLogado ? this.departamentoUsuarioLogado?.nome : "";
  }

  get status() : AbstractControl | null{
    return this.form.get('status');
  }
  get data() : AbstractControl | null{
    return this.form.get('data');
  }
  get mensagem() : AbstractControl | null{
    return this.form.get('mensagem');
  }

  get statusListagem() : string[]{
    return Object.keys(RequisicaoStatus).filter(key => isNaN(+key));
  }

  // END GET

  public async gravar(modal : TemplateRef<any>, requisicao : Requisicao){
    this.form.reset();

    this.SetarValoresForm(requisicao);

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;

      if(!this.form.dirty || this.form.invalid){
        this.notification.message(MessageType.Success,"Requisição","Formulário invalido, preencha todos os campos corretamente.");
        return;
      }
      this.configurarRequisicaoEditada();

      await this.requisicaoService.editar(this.requisicaoEditada); 
      
      this.notification.message(MessageType.Success,"Requisição", "Registro salvo com sucesso!");
      
    }catch(error){
      if(error != "fechar" && error != "0" && error != "1"){
        this.notification.message(MessageType.Info, "Requisição", `Nenhuma informação alterada.`);
        console.log(error);
      }
        
    }

  }
  SetarValoresForm(requisicao: Requisicao) {
    this.requisicaoEditada = requisicao;
    this.form.get('status')?.setValue(requisicao.status);
  }
  configurarRequisicaoEditada() : void {
    const movimentacao = this.form.value;
    movimentacao.data = new Date();

    this.requisicaoEditada.status = movimentacao.status;
    this.requisicaoEditada.ultimaAtualizacao = movimentacao.data;
    this.requisicaoEditada.ultimaMensagem = movimentacao.mensagem;
    this.requisicaoEditada.status = movimentacao.status;

    this.requisicaoEditada.movimentacoes.push(movimentacao);
  }
  
}
