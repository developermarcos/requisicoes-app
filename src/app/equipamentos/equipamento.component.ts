import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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
    private fb : FormBuilder
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
      numeroSerie : new FormControl(""),
      nome : new FormControl(""),
      precoAquisicao : new FormControl(""),
      dataFabricacao : new FormControl("")
    });
  }
  public async gravar(modal : TemplateRef<any>, equipamento? : Equipamento){
    this.form.reset();
    
    if(equipamento)
      this.form.setValue(equipamento);

    try{
      await this.modalService.open(modal, { size: 'lg' }).result;
      
      if(equipamento)
        await this.equipamentoService.editar(this.form.value);
      else
        await this.equipamentoService.inserir(this.form.value);

      console.log(`O departamento foi salvo com sucesso!`);

    }catch(error){
      console.log(error);
    }
  }
  public excluir(equipamento : Equipamento){
    this.equipamentoService.excluir(equipamento);
  }
}
