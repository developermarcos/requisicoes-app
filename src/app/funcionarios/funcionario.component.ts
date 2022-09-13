import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/models/departamento.model';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { AuthenticationService } from '../shared/auth/authentication.service';
import { MessageType } from '../shared/notification/model/message-type.notification.enum';
import { NotificationService } from '../shared/notification/notification.service';
import { Funcionario } from './models/funcionario.model';
import { FuncionarioService } from './services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html'
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
    private departamentoService : DepartamentoService,
    private authService : AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();

    this.form = this.fb.group({
      funcionario: new FormGroup({
        id: new FormControl(""),
        nome : new FormControl(
          "", 
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")//Expressão apenas letras
          ]
        ),
        funcao : new FormControl(
          "", 
          [
            Validators.required,
            Validators.minLength(3),
          ]
        ),
        email : new FormControl(
          "", 
          [
            Validators.required,
            Validators.email
          ]
        ),
        departamentoId : new FormControl("", [Validators.required]),
        departamento : new FormControl("")
      }),
      senha: new FormControl(
        "", 
        [
          Validators.required,
          Validators.minLength(6),
        ]
      )
    });
  }  
  
  // GET
  get tituloModal() : string{
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id() : AbstractControl | null{
    return this.form.get('funcionario.id');
  }

  get nome() : AbstractControl | null{
    return this.form.get('funcionario.nome');
  }

  get funcao() : AbstractControl | null{
    return this.form.get('funcionario.funcao');
  }

  get email() : AbstractControl | null{
    return this.form.get('funcionario.email');
  }

  get departamentoId(){
    return this.form.get('funcionario.departamentoId');
  }
  get departamento() : AbstractControl | null{
    return this.form.get('funcionario.departamento');
  }
  get senha() : AbstractControl | null{
    return this.form.get('senha');
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

      this.form.get("funcionario")?.setValue(funcionarioCompleto);
    }
      

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;

      if(!this.form.dirty || this.form.invalid){
        this.notification.message(MessageType.Success,"Funcionário","Preencha todos os campos.");
        return;
      }

      if(funcionario){
        await this.funcionarioService.editar(this.form.get("funcionario")?.value);
        this.notification.message(MessageType.Success,"Funcionário", "Editado com sucesso!");
      }        
      else{
        
        const usuarioAtual = this.authService.getUsuario();

        await this.authService.cadastrar(this.email?.value, this.senha?.value);
        
        await this.funcionarioService.inserir(this.form.get("funcionario")?.value);

        this.notification.message(MessageType.Success,"Funcionário", "Inserido com sucesso!");
        
        await this.authService.atualizarUsuario(await usuarioAtual);
      }

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
