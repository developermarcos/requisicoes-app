import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  templateUrl: './requisicao.component.html'
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
    private modalService : NgbModal,
    private fb : FormBuilder,
    private requisicaoService : RequisicaoService,
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

  get id() : AbstractControl | null{
    return this.form.get('id');
  }
  get descricao() : AbstractControl | null{
    return this.form.get('descricao');
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
  get dataAbertura() : AbstractControl | null{
    return this.form.get('dataAbertura');
  }
  get equipamentoId() : AbstractControl | null{
    return this.form.get('equipamentoId');
  }
  get equipamento() : AbstractControl | null{
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
      dataAbertura: new FormControl(""),

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
        .subscribe(funcionarioEncotrado => this.idFuncionarioLogado = funcionarioEncotrado.id);
    });    
  }

  public async gravar(modal : TemplateRef<any>, requisicao? : Requisicao){
    this.form.reset();

    this.configurarForm();

    if(requisicao){
      this.SetarValoresForm(requisicao);
    }

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;

      if(!this.form.dirty || this.form.invalid){
        this.notification.message(MessageType.Success,"Requisição","Formulário invalido, preencha todos os campos corretamente.");
        return;
      }

      if(requisicao)
        await this.requisicaoService.editar(this.form.value);        
      else
        await this.requisicaoService.inserir(this.form.value);
        
      this.notification.message(MessageType.Success,"Requisição", "Registro salvo com sucesso!");
      
    }catch(error){
      if(error != "fechar" && error != "0" && error != "1")
        this.notification.message(MessageType.Info, "Requisição", `Nenhuma informação alterada.`);
    }
  }
  private SetarValoresForm(requisicao: Requisicao) {
    const departamento = requisicao.departamento ? requisicao.departamento : null;
    const funcionario = requisicao.funcionario ? requisicao.funcionario : null;
    const equipamento = requisicao.equipamento ? requisicao.equipamento : null;

    const requisicaoCompleta = {
      ...requisicao,
      departamento,
      funcionario,
      equipamento
    };

    this.form.setValue(requisicaoCompleta);
  }

  private configurarForm() {
    this.form.get("dataAbertura")?.setValue(new Date());
    this.form.get("equipamentoid")?.setValue(null);
    this.form.get("funcionarioId")?.setValue(this.idFuncionarioLogado);
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
