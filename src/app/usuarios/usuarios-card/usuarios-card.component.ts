import { Component, Input, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { Perfil } from "../interfaces/perfil.interface";
import { Usuario } from "../interfaces/usuario.interface";

@Component({
  selector: "app-usuarios-card",
  templateUrl: "./usuarios-card.component.html",
  styleUrls: ["./usuarios-card.component.scss"],
})
export class UsuariosCardComponent implements OnInit {
  @Input() usuario!: Usuario;

  constructor() {}

  ngOnInit(): void {}

  getImagenPerfilUsuario(): string {
    let sufijo = "";
    let urlPerfil = `${environment.storageUrl}`;

    if (this.usuario.perfil?.avatar !== null) {
      urlPerfil += sufijo + this.usuario.perfil?.avatar;
    } else {
      urlPerfil += "/default.png";
    }
    return urlPerfil;
  }
}
