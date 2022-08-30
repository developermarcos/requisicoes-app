import { Injectable } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { MessageType } from './model/message-type.notification.enum';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr : ToastrService) { }

  public showModal(Type : MessageType, titulo : string, message : string){
    switch(Type){
      case MessageType.Alert:
        return Swal.fire({
          title : titulo,
          text : message,
          confirmButtonText : 'OK'
        });
      case MessageType.Question:
        return Swal.fire({
          title : titulo,
          text : message,
          showCancelButton: true,
          confirmButtonText : 'Confirmar'
        });
      case MessageType.Success:
        return Swal.fire({
          title : titulo,
          text : message,
          confirmButtonText : 'OK'
        });
      case MessageType.Info:
        return Swal.fire({
          title : titulo,
          text : message,
          confirmButtonText : 'OK'
        });
    }
  }
  public message(Type : MessageType, titulo : string, message : string){
    let menssageModel : any;
    switch(Type){
      case MessageType.Alert:
        menssageModel = this.toastr.error;
        this.toastr.error(message, titulo);
        break;
      case MessageType.Question:
        this.toastr.info(message, titulo);
        break;
      case MessageType.Success:
        menssageModel = this.toastr.success;
        this.toastr.success(message, titulo);
        break;
      case MessageType.Info:
        this.toastr.info(message, titulo);
        break;
    }
    
    // menssageModel(message, titulo);
  }
}
