import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MessageType } from '../shared/notification/model/message-type.notification.enum';
import { NotificationService } from '../shared/notification/notification.service';
import { dataFuturaValidator } from '../shared/validators/data-futura.validator';
import { Equipamento } from './model/equipamento.model';
import { EquipamentoService } from './services/departamento.service';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.css']
})
export class EquipamentoComponent implements OnInit {

  public equipamentos$ : Observable<Equipamento[]>
  public form : FormGroup;
  
  constructor(
    private equipamentoService : EquipamentoService,
    private modalService : NgbModal,
    private fb : FormBuilder,
    private notification : NotificationService
  ) { }

  // GET
  get tituloModal() : string{
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(){
    return this.form.get('id');
  }

  get numeroSerie(){
    return this.form.get('numeroSerie');
  }

  get nome(){
    return this.form.get('nome');
  }

  get precoAquisicao(){
    return this.form.get('precoAquisicao');
  }

  get dataFabricacao(){
    return this.form.get('dataFabricacao');
  }
  // END GET

  ngOnInit(): void {
    this.equipamentos$ = this.equipamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      numeroSerie : new FormControl(
        "", 
        [
          Validators.required,
        ]
      ),
      nome : new FormControl(
        "", 
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ),
      precoAquisicao : new FormControl("", 
      [
        Validators.required
      ]),
      dataFabricacao : new FormControl(
        "", 
        [
          Validators.required,
          dataFuturaValidator()
        ]
      )
    });
  }
  public async gravar(modal : TemplateRef<any>, equipamento? : Equipamento){
    this.form.reset();
    if(equipamento)
      this.form.setValue(equipamento);

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;

      if(!this.form.dirty || this.form.invalid){
        this.notification.message(MessageType.Alert,"Equipamento","Preencha todos os campos.");
        return;
      }
      
      let menssage : string;
      if(equipamento){
        await this.equipamentoService.editar(this.form.value);
        menssage = 'Editado com sucesso!';
      }        
      else{
        await this.equipamentoService.inserir(this.form.value);
        menssage = 'Inserido com sucesso!';
      }

      this.notification.message(MessageType.Success,"Equipamento",menssage);

    }catch(_error){
      this.notification.message(MessageType.Info, "Equipamento", `Nenhuma informação alterada.`);
    }
  }
  public async excluir(equipamento : Equipamento){

    const result = await this.notification.showModal(MessageType.Question,"Exclusão de Equipamento", `Deseja realmente excluir o equipamento '${equipamento.nome}'?`);

    if(result.isConfirmed){
      this.equipamentoService.excluir(equipamento);
      this.notification.message(MessageType.Success, "Equipamento", `'${equipamento.nome}' excluído com sucesso!`);
      return;
    }

    this.notification.message(MessageType.Info, "Equipamento", `Equipamento '${equipamento.nome}' não excluído`); 
  }
}
