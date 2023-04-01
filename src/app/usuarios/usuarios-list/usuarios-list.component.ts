import { Component, Input, OnInit } from "@angular/core";
import { Perfil } from "../interfaces/perfil.interface";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { Usuario } from "../interfaces/usuario.interface";
import { UsuariosService } from "../services/usuarios.service";

@Component({
  selector: "app-usuarios-list",
  templateUrl: "./usuarios-list.component.html",
  styleUrls: ["./usuarios-list.component.scss"],
})
export class UsuariosListComponent implements OnInit {
  @Input() perfil!: Perfil;
  usuarios: Usuario[];

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.perfil = this.route.snapshot.data["usuario"];
    this.usuariosService
      .getAmigosUsuario(this.perfil.id)
      .subscribe((perfiles) => (this.usuarios = perfiles));
  }

  getImagenPerfilUsuario(): string {
    let sufijo = "";
    let urlPerfil = `${environment.storageUrl}`;

    if (this.perfil.avatar !== null) {
      urlPerfil += sufijo + this.perfil.avatar;
    } else {
      urlPerfil += "/default.png";
    }
    return urlPerfil;
  }
}
