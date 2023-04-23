import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Usuario } from "../interfaces/usuario.interface";
import { UsuariosService } from "../services/usuarios.service";

@Component({
  selector: "app-usuarios-list",
  templateUrl: "./usuarios-list.component.html",
  styleUrls: ["./usuarios-list.component.scss"],
})
export class UsuariosListComponent implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[];

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.usuario = this.route.snapshot.data["usuario"];
    this.usuariosService
      .getAmigosUsuario(this.usuario.id)
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }
}
