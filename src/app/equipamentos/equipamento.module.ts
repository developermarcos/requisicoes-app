import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentoRoutingModule } from './equipamento-routing.module';
import { EquipamentoComponent } from './equipamento.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxCurrencyModule } from 'ngx-currency';//Currency mask validation
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    EquipamentoComponent
  ],
  imports: [
    CommonModule,
    EquipamentoRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    NgxMaskModule.forChild()
  ]
})
export class EquipamentoModule { }
