import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../shared/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form : FormGroup;
  public formRecuperacao : FormGroup;
  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthenticationService,
    private router : Router,
    private modalService : NgbModal 
  ) {

   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(""),
      senha : new FormControl("")
    });
    this.formRecuperacao = this.formBuilder.group({
      emailRecuperacao: new FormControl("")
    });      
  }
  
  get email() : AbstractControl | null{
    return this.form.get("email");
  }
  get senha() : AbstractControl | null{
    return this.form.get("senha");
  }
  get emailRecuperacao() : AbstractControl | null{
    return this.formRecuperacao.get('emailRecuperacao');
  }
  public async login(){
    const emailTxt = this.email?.value;
    const senhaTxt = this.senha?.value;

    try{
      const resposta = await this.authService.login(emailTxt, senhaTxt);
      if(resposta?.user){
        this.router.navigate(["/painel"]);
      }
    }catch(error){
      console.log(error);
    }

    // this.authService.login(emailTxt, senhaTxt)
    // .then(res => console.log(res))
    // .catch(err => console.log("Erro"));
  }
  public abrirModal(modal : TemplateRef<any>){
    this.modalService
    .open(modal)
    .result
    .then(resultado =>{
      if(resultado === "enviar"){
        this.authService.resetarSenha(this.emailRecuperacao?.value);
      }
    })
    .catch(() => {
      this.formRecuperacao.reset(); 
    })
  }


}
