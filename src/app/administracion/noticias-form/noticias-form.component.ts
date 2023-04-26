import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Noticia } from 'src/app/noticias/interfaces/noticia.interface';
import Swal from 'sweetalert2';
import { NoticiasService } from '../services/noticias.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-noticias-form',
  templateUrl: './noticias-form.component.html',
  styleUrls: ['./noticias-form.component.scss']
})
export class NoticiasFormComponent implements OnInit {
  selectedDate: NgbDateStruct;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  noticiaForm: FormGroup;
  noticiaId?: number;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  formBuilder: any;
  imagen: any;
  imageName: string;
  isUpdating: any;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private fb: FormBuilder
  ) { 
    this.noticiaForm = this.fb.group({
      promocionada: [false],
      titular: ['', Validators.required],
      fecha: ['', Validators.required],
      textoCorto: ['', Validators.required],
      textoLargo: ['', Validators.required],
      enlace: ['']
    });
  }

  @ViewChild('dz') drpzone?: DropzoneComponent;

  ngOnInit(): void {
    let getNoticia = <Noticia>this.route.snapshot.data['noticia'];
    if (getNoticia != null && getNoticia.id != null) {
      this.noticiaId = getNoticia.id;
    }
  }
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }


  async addNoticia(): Promise<boolean> {
    if (!this.noticiaForm.valid) {
      Object.values(this.noticiaForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return false;
    }

    let result: boolean;
    //event with newEvent data to store in events[]
    let noticiaCreada: Noticia = {
      titular: this.noticiaForm.controls.titular.value,
      fecha: this.noticiaForm.controls.fecha.value,
      textoCorto: this.noticiaForm.controls.textoCorto.value,
      textoLargo: this.noticiaForm.controls.textoLargo.value,
      link:this.noticiaForm.controls.enlace.value,
      imagen: this.imageName,
      imagenBase64: this.imagen,
      companyiaId: localStorage.getItem("companyiaId"),
      promocionada: this.noticiaForm.controls.promocionada.value
    };
    if (this.isUpdating) {
      return this.updateNoticia(noticiaCreada);
    } else {
      return this.saveNoticia(noticiaCreada);
    }
  }
  saveNoticia(noticiaCreada: Noticia): boolean | PromiseLike<boolean> {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      this.noticiasService.addNoticia(noticiaCreada).subscribe({
        next: (noticia) => {
         /* this.showImage = false;
          this.saved = true;
          this.add.emit(event);
          location.assign('/events');
          result = true;
          resolve(result);*/
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
          console.log('Sala creada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }
  updateNoticia(noticiaCreada: Noticia): boolean | PromiseLike<boolean> {
    var promise = new Promise<boolean>((resolve, reject) => {
      let result: boolean;
      noticiaCreada.id = this.noticiaId;
      this.noticiasService.updateNoticia(noticiaCreada).subscribe({
        next: (noticia) => {
        //  this.showImage = false;
        //  this.saved = true;
       //   this.add.emit(event);
          location.assign('/administracion/salas');
          result = true;
          resolve(result);
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
          console.log('Sala actualizada');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }

  onFileDropped(event: any) {
    // Aquí iría la lógica para procesar la imagen que se ha subido al formulario
  }

  onSending(event: any) {
    // Aquí iría la lógica para mostrar un mensaje de envío en progreso
  }

  onAddedFile(file: any):void{
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', (e) => {
      this.imagen=e.target?.result;
      this.imageName = reader.result as string;
    });
  }


  onRemoveFile(event: any) {
    // Aquí iría la lógica para eliminar un archivo del formulario
  }

  resetDropzone1Uploads(): void {
    this.drpzone?.directiveRef?.reset()
    this.drpzone?.directiveRef?.dropzone();
   
  }
}
