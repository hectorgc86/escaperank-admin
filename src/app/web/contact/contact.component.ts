import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import Swal from 'sweetalert2';
import { textChangeRangeIsUnchanged } from 'typescript';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

/**
 * Contact-component
 */
export class ContactComponent implements OnInit {
  recipient: string ="";
  subject: string ="";
  message: string ="";
  name: string ="";
  constructor(private webService: WebService) { }

  ngOnInit(): void {
  }

  sendEmail() {

    if (this.message==""|| this.name=="" || this.subject==""|| this.recipient==""){
      var promise = new Promise<boolean>((resolve, reject) => {
        let result: boolean;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:"Debes rellenar todos los campos.",
      });
      result = false;
      resolve(result);
    });
    }else{


    const mensaje = "Nombre: "+this.name+"<br>Correo Electrónico: "+this.recipient+"<br>Asunto: "+this.subject +"<br>Mensaje: "+this.message;

    const emailData = {
      recipient: this.recipient,
      subject: "Mensaje desde Web",
      html: mensaje,
      name: this.name,
      to: 'escaperankapp@gmail.com'
    };

    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.webService.sendEmail(emailData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado correctamente.',
            text: "Pronto nos pondremos en contacto contigo",
          });
            this.message = "";
            this.name = "";
          this.subject="";
         this.recipient="";
         },
        error: (error: { message: any; }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
          result = false;
          resolve(result);
        },
        complete: () => {
          console.log('Error enviando mensaje');
          result = true;
          resolve(result);
        },
      });
    });
   


  }
  return promise;
  }


}
