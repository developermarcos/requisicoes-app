import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MessageType } from '../shared/notification/model/message-type.notification.enum';
import { NotificationService } from '../shared/notification/notification.service';
import { Departamento } from './models/departamento.model';
import { DepartamentoService } from './services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  public departamentos$ : Observable<Departamento[]>
  public form : FormGroup;
  
  constructor(
    private departamentoService : DepartamentoService,
    private modalService : NgbModal,
    private fb : FormBuilder,
    private notification : NotificationService
  ) { }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      nome : new FormControl(""),
      telefone : new FormControl("")
    });
  }

  get tituloModal() : string{
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(){
    return this.form.get("id");
  }

  get nome(){
    return this.form.get("nome");
  }

  get telefone(){
    return this.form.get("telefone");
  }
  
  public async gravar(modal : TemplateRef<any>, departamento? : Departamento){
    this.form.reset();
    
    if(departamento)
      this.form.setValue(departamento);

    try{
      await this.modalService.open(modal).result;
      
      let message : string;
      if(departamento){
        await this.departamentoService.editar(this.form.value);
        message = "Editado com sucesso!";
      }        
      else{
        await this.departamentoService.inserir(this.form.value);
        message = "Inserido com sucesso!";
      }        

      this.notification.message(MessageType.Success, "Departamento", message);

    }catch(error){
      this.notification.message(MessageType.Info, "Departamento", `Nenhuma informação alterada.`);
    }
  }

  public async excluir(departamento : Departamento){
    const result = await this.notification.showModal(MessageType.Question,"Exclusão de departamento", `Deseja realmente excluir o departamento ${departamento.nome}`);

    if(result.isConfirmed){
      this.departamentoService.excluir(departamento);
      this.notification.message(MessageType.Success, "Departamento", `'${departamento.nome}' excluído com sucesso!`);
      return;
    }
    this.notification.message(MessageType.Info, "Departamento", `'${departamento.nome}' não excluído`); 
  }

}
