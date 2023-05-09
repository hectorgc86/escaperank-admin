import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DropzoneConfigInterface, DropzoneDirective, DropzoneComponent } from "ngx-dropzone-wrapper";
import Swal from "sweetalert2";
import { Usuario, UsuarioRequest } from "../interfaces/usuario.interface";
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.css"],
})
export class UsuariosFormComponent {

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  selectedDate: NgbDateStruct;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  usuarioForm: FormGroup;
  usuarioId?: number;
  formBuilder: any;
  avatar: any;
  avatarName: string;

  constructor(
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private ngbParser: NgbDateParserFormatter
  ) {
  }

  @ViewChild('dz') drpzone?: DropzoneComponent;

  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem("usuario")!) as Usuario;

    if (usuario != null && usuario.id != null) {
      this.usuarioId = usuario.id;
    }

    let fechaNacimientoStruct = this.ngbParser.parse(usuario.perfil?.nacido!);
    let fechaNacimiento: NgbDateStruct | null= fechaNacimientoStruct ? { year: fechaNacimientoStruct.year, month: fechaNacimientoStruct.month, day: fechaNacimientoStruct.day } : null;

    let partesNombre = usuario.perfil?.nombre ? usuario.perfil?.nombre!.split(" ") : [,];

    this.usuarioForm = this.fb.group({
      nick: [usuario.nick, Validators.required],
      contrasenya: ["", Validators.required],
      nombre: [partesNombre[0], Validators.required],
      apellidos: [partesNombre[1], Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      telefono: [usuario.perfil?.telefono, [Validators.required, Validators.max]],
      nacido: [fechaNacimiento, Validators.required],
      avatar: [usuario.perfil?.avatar, Validators.required],
    });

  }
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  async actualizarUsuario(): Promise<boolean> {
    if (!this.usuarioForm.valid) {
      Object.values(this.usuarioForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return false;
    }

    let usuarioModificado: UsuarioRequest = {
      nick: this.usuarioForm.controls.nombre.value,
      email: this.usuarioForm.controls.apellidos.value,
      contrasenya: this.usuarioForm.controls.nick.value,
      telefono:this.usuarioForm.controls.telefono.value,
      nacido: this.usuarioForm.controls.nacimiento.value,
      avatar: this.avatarName,
      avatarBase64: this.avatar,
    };

      return this.updateUsuario(usuarioModificado);
  }

  updateUsuario(usuarioModificado: UsuarioRequest): boolean | PromiseLike<boolean> {
    var promise = new Promise<boolean>((resolve) => {
      let result: boolean;
      this.usuariosService.putUsuario(this.usuarioId, usuarioModificado).subscribe({
        next: () => {
          location.assign('/usuario');
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
          console.log('Usuario actualizado');
          result = true;
          resolve(result);
        },
      });
    });
    return promise;
  }

  onAddedFile(file: any):void{
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', (e) => {
      this.avatar=e.target?.result;
      this.avatarName = reader.result as string;
    });
  }

  resetDropzone1Uploads(): void {
    this.drpzone?.directiveRef?.reset()
    this.drpzone?.directiveRef?.dropzone();
  }
}
