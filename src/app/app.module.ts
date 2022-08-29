import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './shared/auth/authentication.service';
import { PainelComponent } from './painel/painel.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DepartamentoModule } from './departamentos/departamento.module';
import { NotificationService } from './shared/notification/notification.service';
import { EquipamentoModule } from './equipamentos/equipamento.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//notification animation
import { ToastrModule } from 'ngx-toastr';//notification

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    DepartamentoModule,
    EquipamentoModule
  ],
  providers: [AuthenticationService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
