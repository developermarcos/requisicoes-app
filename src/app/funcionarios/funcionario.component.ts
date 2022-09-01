import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { MessageType } from '../shared/notification/model/message-type.notification.enum';
import { NotificationService } from '../shared/notification/notification.service';
import { Funcionario } from './models/funcionario.model';
import { FuncionarioService } from './services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  public funcionarios$ : Observable<Funcionario[]>;
  public departamentos$ : Observable<Departamento[]>;
  public form : FormGroup;

  constructor(
    private funcionarioService : FuncionarioService,
    private modalService : NgbModal,
    private fb : FormBuilder,
    private notification : NotificationService,
    private departamentoService : DepartamentoService
  ) { }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      nome : new FormControl(""),
      funcao : new FormControl(""),
      email : new FormControl(""),
      departamentoId : new FormControl(""),
      departamento : new FormControl("")
    });
  }  
  
  // GET
  get tituloModal() : string{
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(){
    return this.form.get('id');
  }

  get nome(){
    return this.form.get('nome');
  }

  get funcao(){
    return this.form.get('funcao');
  }
  get departamento(){
    return this.form.get('departamento');
  }
  // END GET

  public async gravar(modal : TemplateRef<any>, funcionario? : Funcionario){
    this.form.reset();
    if(funcionario){
      const departamento = funcionario.departamento ? funcionario.departamento : null;

      const funcionarioCompleto = {
        ...funcionario,
        departamento
      }

      this.form.setValue(funcionarioCompleto);
    }
      

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;
      
      let menssage : string;
      if(funcionario){
        await this.funcionarioService.editar(this.form.value);
        menssage = 'Editado com sucesso!';
      }        
      else{
        await this.funcionarioService.inserir(this.form.value);
        menssage = 'Inserido com sucesso!';
      }

      this.notification.message(MessageType.Success,"Funcionário",menssage);

    }catch(_error){
      this.notification.message(MessageType.Info, "Funcionário", `Nenhuma informação alterada.`);
    }
  }
  public async excluir(funcionario : Funcionario){
    const result = await this.notification.showModal(MessageType.Question,"Exclusão de Equipamento", `Deseja realmente excluir o equipamento '${funcionario.nome}'?`);

    if(result.isConfirmed){
      this.funcionarioService.excluir(funcionario);
      this.notification.message(MessageType.Success, "Funcionário", `'${funcionario.nome}' excluído com sucesso!`);
      return;
    }

    this.notification.message(MessageType.Info, "Funcionário", `Funcionário '${funcionario.nome}' não excluído`); 
  }
}
