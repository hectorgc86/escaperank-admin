import { Component, TemplateRef, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  DropzoneConfigInterface,
  DropzoneDirective,
  DropzoneComponent,
} from "ngx-dropzone-wrapper";
import Swal from "sweetalert2";
import { Usuario, UsuarioRequest } from "../interfaces/usuario.interface";
import { UsuariosService } from "../services/usuarios.service";
import { ImageUtils } from "src/app/core/utils/image-utils";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.css"],
})
export class UsuariosFormComponent {
  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  selectedDate: NgbDateStruct;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };
  imageUtils = ImageUtils;

  usuarioForm: FormGroup;
  usuarioId?: number;
  formBuilder: any;
  avatar: any;
  avatarName: string;
  usuario: Usuario;
  imageChanged: boolean;

  constructor(
    private modalService: NgbModal,
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder,
    private ngbParser: NgbDateParserFormatter
  ) {}

  @ViewChild("dz") drpzone?: DropzoneComponent;

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario")!) as Usuario;
    this.avatar = this.imageUtils.getImagenUsuario(this.usuario.perfil!);
    this.imageChanged = false;

    if (this.usuario != null && this.usuario.id != null) {
      this.usuarioId = this.usuario.id;
    }

    let fechaNacimientoStruct = this.ngbParser.parse(
      this.usuario.perfil?.nacido!
    );
    let fechaNacimiento: NgbDateStruct | null = fechaNacimientoStruct
      ? {
          year: fechaNacimientoStruct.year,
          month: fechaNacimientoStruct.month,
          day: fechaNacimientoStruct.day,
        }
      : null;

    let partesNombre = this.usuario.perfil?.nombre
      ? this.usuario.perfil?.nombre!.split(" ")
      : [,];

    this.usuarioForm = this.fb.group({
      nick: [this.usuario.nick, Validators.required],
      nombre: [partesNombre[0], Validators.required],
      apellidos: [partesNombre[1], Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      telefono: [
        this.usuario.perfil?.telefono,
        [Validators.required, Validators.max],
      ],
      nacido: [fechaNacimiento, Validators.required],
      nuevaContrasenya: [""],
      repetirContrasenya: [""],
      avatar: [this.usuario.perfil?.avatar, Validators.required],
    },{ validator: this.passwordMatchValidator });
  }

  async actualizarUsuario(): Promise<boolean> {
    if (!this.usuarioForm.valid) {
      this.usuarioForm.markAllAsTouched();
      return false;
    }

    const usuarioModificado: UsuarioRequest = {
      nick: this.usuarioForm.controls.nick.value,
      nombre: `${this.usuarioForm.controls.nombre.value} ${this.usuarioForm.controls.apellidos.value}`,
      contrasenya: this.usuarioForm.controls.repetirContrasenya.value,
      email: this.usuarioForm.controls.email.value,
      telefono: this.usuarioForm.controls.telefono.value,
      avatar: this.avatarName,
      nacido: this.usuarioForm.controls.nacido.touched
        ? `${this.usuarioForm.controls.nacido.value.year}-${this.usuarioForm.controls.nacido.value.month}-${this.usuarioForm.controls.nacido.value.day}`
        : this.usuario.perfil?.nacido,
      avatarBase64: this.imageChanged ? this.avatar : undefined,
    };

    return this.updateUsuario(usuarioModificado);
  }

  updateUsuario(
    usuarioModificado: UsuarioRequest
  ): boolean | PromiseLike<boolean> {
    var promise = new Promise<boolean>((resolve) => {
      let result: boolean;
      this.usuariosService
        .putUsuario(this.usuario.id, usuarioModificado)
        .subscribe({
          next: (usuarioModificado: Usuario) => {
            localStorage.setItem("usuario", JSON.stringify(usuarioModificado));
            location.assign(`/usuarios/perfil`);
            result = true;
            resolve(result);
          },
          error: (res: any) => {
            Swal.fire({
              icon: "error",
              title: "Ha ocurrido un error actualizando usuario",
              text: res.error.error,
            });
            result = false;
            resolve(result);
          },
          complete: () => {
            console.log("Usuario actualizado");
            result = true;
            resolve(result);
          },
        });
    });
    return promise;
  }

  onAddedFile(file: any): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("loadend", (e) => {
      this.avatar = e.target?.result;
      this.avatarName = reader.result as string;
      this.imageChanged = true;
    });
  }

  resetDropzone1Uploads(): void {
    this.drpzone?.directiveRef?.reset();
    this.drpzone?.directiveRef?.dropzone();
  }

  openBajaModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        if (result === "baja") {
          this.usuariosService.deleteUsuario(this.usuario.id).subscribe(() => {
            this.authService.logout();
            location.assign("web");
          });
        }
      })
      .catch((res) => {});
  }

  passwordMatchValidator(control: AbstractControl) {
    const nuevaContrasenya = control.get('nuevaContrasenya')!.value;
    const repetirContrasenya = control.get('repetirContrasenya')!.value;

    if (nuevaContrasenya !== repetirContrasenya) {
      control.get('repetirContrasenya')!.setErrors({ passwordMismatch: true });
    } else {
      control.get('repetirContrasenya')!.setErrors(null);
    }
  }
}
