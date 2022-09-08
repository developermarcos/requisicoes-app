import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, Subscription } from 'rxjs';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { Equipamento } from '../equipamentos/model/equipamento.model';
import { EquipamentoService } from '../equipamentos/services/departamento.service';
import { Funcionario } from '../funcionarios/models/funcionario.model';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { MessageType } from '../shared/notification/model/message-type.notification.enum';
import { NotificationService } from '../shared/notification/notification.service';
import { Requisicao } from './model/requisicao.model';
import { RequisicaoService } from './services/requisicao.service';
import { AuthenticationService } from '../shared/auth/authentication.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  public requisicoes$ : Observable<Requisicao[]>
  public departamentos$ : Observable<Departamento[]>
  public equipamentos$ : Observable<Equipamento[]>
  public funcionarios$ : Observable<Funcionario[]>
  public form : FormGroup;
  emailUsuario? : string | null;
  usuarioLogado$ : Subscription;
  idFuncionarioLogado : string;

  constructor(
    private requisicaoService : RequisicaoService,
    private modalService : NgbModal,
    private fb : FormBuilder,
    private notification : NotificationService,
    private departamentoService : DepartamentoService,
    private funcionarioService : FuncionarioService,
    private equipamentoService : EquipamentoService,
    private authService : AuthenticationService
  ) { }

  // GET
  get tituloModal() : string{
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(){
    return this.form.get('id');
  }
  get descricao(){
    return this.form.get('descricao');
  }
  get funcionarioId(){
    return this.form.get('funcionarioId');
  }
  get funcionario(){
    return this.form.get('funcionario');
  }
  get departamentoId(){
    return this.form.get('departamentoId');
  }
  get departamento(){
    return this.form.get('departamento');
  }
  get dataAbertura(){
    return this.form.get('dataAbertura');
  }
  get equipamentoId(){
    return this.form.get('equipamentoId');
  }
  get equipamento(){
    return this.form.get('equipamento');
  }

  // END GET

  ngOnInit(): void {
    this.requisicoes$ = this.requisicaoService.selecionarTodos();
    this.funcionarios$ = this.funcionarioService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.equipamentos$ = this.equipamentoService.selecionarTodos();
    
    this.form = this.fb.group({
      id: new FormControl(""),
      descricao: new FormControl(""),
      funcionarioId : new FormControl(""),
      funcionario : new FormControl(""),
      departamentoId : new FormControl("", [Validators.required]),
      departamento : new FormControl(""),
      dataAbertura: new FormControl(""),
      equipamentoId : new FormControl(""),
      equipamento : new FormControl(""),
    });
    
    this.usuarioLogado$ = this.authService.usuarioLogado
      .subscribe(usuario => {
        this.emailUsuario = usuario?.email!

        this.funcionarioService.selecionarPorEmail(this.emailUsuario)
        .subscribe(funcionarioEncotrado => this.idFuncionarioLogado = funcionarioEncotrado.id);
      });

    
  }

  public async gravar(modal : TemplateRef<any>, requisicao? : Requisicao){
    this.form.reset();
    if(requisicao){
      this.form.setValue(requisicao);
    }

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;

      if(!this.form.dirty || this.form.invalid){
        this.notification.message(MessageType.Success,"Requisição","Preencha todos os campos.");
        return;
      }

      if(requisicao){
        await this.requisicaoService.editar(this.form.value);
        this.notification.message(MessageType.Success,"Requisição", "Editado com sucesso!");
      }        
      else{
        const requisicaoGravar : Requisicao = this.form.value;

        requisicaoGravar.dataAbertura = new Date().toLocaleDateString();

        requisicaoGravar.funcionarioId = this.idFuncionarioLogado;
        
        await this.requisicaoService.inserir(requisicaoGravar);
        
        this.notification.message(MessageType.Success,"Requisição", "Inserido com sucesso!");
      }

    }catch(_error){
      this.notification.message(MessageType.Info, "Requisição", `Nenhuma informação alterada.`);
    }
  }
  public async excluir(requisicao : Requisicao){
    const result = await this.notification.showModal(MessageType.Question,"Exclusão de requisições", `Deseja realmente excluir a requisicao '${requisicao.descricao}'?`);

    if(result.isConfirmed){
      this.requisicaoService.excluir(requisicao);
      this.notification.message(MessageType.Success, "Requisição", `'${requisicao.descricao}' excluída com sucesso!`);
      return;
    }

    this.notification.message(MessageType.Info, "Requisição", `Requisição '${requisicao.descricao}' não excluída.`); 
  }
}
