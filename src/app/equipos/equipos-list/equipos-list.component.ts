import { Component, OnInit, TemplateRef } from "@angular/core";
import { Amigo, Usuario } from "src/app/usuarios/interfaces/usuario.interface";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";
import { Equipo, EquipoRequest } from "../interfaces/equipo.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Estado } from "src/app/usuarios/interfaces/estado.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EquiposService } from "../services/equipos.service";

@Component({
  selector: "app-equipos-list",
  templateUrl: "./equipos-list.component.html",
  styleUrls: ["./equipos-list.component.scss"],
})
export class EquiposListComponent implements OnInit {
  usuario: Usuario;
  equipos: Equipo[];
  amigos: Amigo[];
  equipoFormGroup: FormGroup;

  nombreEquipo: string;
  checkEliminar: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private equiposService: EquiposService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.amigos = [];

    this.equipoFormGroup = this.fb.group({
      nombre: [null, Validators.required],
      amigos: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkEliminar = false;
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
    this.usuariosService
      .getEquiposUsuario(this.usuario.id)
      .subscribe((equipos) => (this.equipos = equipos));
    this.usuariosService
      .getAmigosUsuario(this.usuario.id)
      .subscribe(
        (amigos: Amigo[]) =>
          (this.amigos = amigos.filter(
            (amigo) => amigo.estado == Estado.aceptado
          ))
      );
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then(() => {
        if (!this.equipoFormGroup.valid) {
          Object.values(this.equipoFormGroup.controls).forEach((control) => {
            control.markAsTouched();
          });
        } else {
          const equipoRequest: EquipoRequest = {
            nombre: this.equipoFormGroup.controls.nombre.value,
            usuarios: this.equipoFormGroup.controls.amigos.value,
            activado: true,
          };

          equipoRequest.usuarios?.push(this.usuario);

          this.equiposService.postEquipo(equipoRequest).subscribe(() => {
            console.log("Equipo creado correctamente");
            location.reload();
          });
        }
      })
      .catch((res) => {});
  }

  modoEliminar(): void {
    if (!this.checkEliminar) {
      this.checkEliminar = true;
    } else {
      this.checkEliminar = false;
    }
  }
}
