import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild()
  ]
})
export class FuncionarioModule { }
