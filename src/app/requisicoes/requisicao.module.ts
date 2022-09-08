import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    RequisicaoComponent
  ],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
  ]
})
export class RequisicaoModule { }
