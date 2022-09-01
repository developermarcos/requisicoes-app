import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public usuarioLogado : Observable<firebase.User | null>;

  constructor(private auth: AngularFireAuth) {
    this.usuarioLogado = auth.authState;
  }

  get estaLogado() : boolean{
    if (this.usuarioLogado !== null)
      return true;
    
    return false;    
  }

  public login(email: string, senha : string) : Promise<firebase.auth.UserCredential>{
    return this.auth.signInWithEmailAndPassword(email,senha);
  }

  public resetarSenha(email : string) : Promise<void>{
    return this.auth.sendPasswordResetEmail(email);
  }
  public logout() : Promise<void>{
    return this.auth.signOut();
  }
}
