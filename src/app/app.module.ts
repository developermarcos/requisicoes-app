import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PainelComponent } from './painel/painel.component';
import { DepartamentoModule } from './departamentos/departamento.module';
import { EquipamentoModule } from './equipamentos/equipamento.module';


import { SharedModule } from './shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { FuncionarioComponent } from './funcionarios/funcionario.component';
import { FuncionarioModule } from './funcionarios/funcionario.module';
registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    FuncionarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    DepartamentoModule,
    EquipamentoModule,
    FuncionarioModule,
    SharedModule,
    NgxMaskModule.forRoot({dropSpecialCharacters : false}),
  ],
  providers: [
    {provide : LOCALE_ID, useValue : "pt"},
    {provide : DEFAULT_CURRENCY_CODE, useValue : "BRL"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
