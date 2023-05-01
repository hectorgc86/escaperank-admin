import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/usuarios/interfaces/usuario.interface";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";
import { Equipo } from "../interfaces/equipo.interface";

@Component({
  selector: "app-equipos-list",
  templateUrl: "./equipos-list.component.html",
  styleUrls: ["./equipos-list.component.scss"],
})
export class EquiposListComponent implements OnInit {
  usuario: Usuario;
  equipos: Equipo[];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
    this.usuariosService
      .getEquiposUsuario(this.usuario.id)
      .subscribe((equipos) => (this.equipos = equipos));
  }
}
