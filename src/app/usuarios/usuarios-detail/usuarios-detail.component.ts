import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { Perfil } from "../interfaces/perfil.interface";

@Component({
  selector: "app-usuarios-detail",
  templateUrl: "./usuarios-detail.component.html",
  styleUrls: ["./usuarios-detail.component.css"],
})
export class UsuariosDetailComponent implements OnInit {
  @Input() perfil!: Perfil;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.perfil = this.route.snapshot.data["event"];
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
