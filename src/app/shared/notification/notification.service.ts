import { Injectable } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { MessageType } from './model/message-type.notification.enum';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr : ToastrService) { }

  public showModal(Type : MessageType, titulo : string, menssage : string){
    switch(Type){
      case MessageType.Alert:
        return Swal.fire('Mensagem sucesso! Swal.fire');
      case MessageType.Question:
        return Swal.fire({
          title : titulo,
          showCancelButton: true,
          confirmButtonText : 'Confirmar'
        });
      case MessageType.Success:
        return Swal.fire('Mensagem sucesso! Swal.fire');
      case MessageType.Warning:
        return Swal.fire('Mensagem sucesso! Swal.fire');
    }
  }
  public message(Type : MessageType, message : string){
    switch(Type){
      case MessageType.Alert:
        this.toastr.error(message);
        break;
      case MessageType.Question:
        this.toastr.info(message);
        break;
      case MessageType.Success:
        this.toastr.success(message);
        break;
      case MessageType.Warning:
        this.toastr.warning(message);
        break;
    }
  }
}
