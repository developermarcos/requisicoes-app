import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { FuncionarioComponent } from './funcionario.component';


@NgModule({
  declarations: [
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
  ]
})
export class FuncionarioModule { }
