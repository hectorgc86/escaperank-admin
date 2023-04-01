import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { Perfil } from "../interfaces/perfil.interface";

@Component({
  selector: "app-usuarios-detail",
  templateUrl: "./usuarios-detail.component.html",
  styleUrls: ["./usuarios-detail.component.scss"],
})
export class UsuariosDetailComponent implements OnInit {
  @Input() perfil!: Perfil;
  totalPartidas: string;
  edad: string;

  constructor(private route: ActivatedRoute) {
    this.totalPartidas = "0";
  }

  ngOnInit(): void {
    this.perfil = this.route.snapshot.data["usuario"];
    this.totalPartidas = (this.perfil.partidasGanadas! +
      this.perfil.partidasPerdidas!) as unknown as string;
    this.calcularEdad(this.perfil.nacido);
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

  calcularEdad(fechaNacimiento: string | null | undefined) {
    const convertAge = new Date(fechaNacimiento!);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.edad = Math.floor(
      timeDiff / (1000 * 3600 * 24) / 365
    ) as unknown as string;
  }
}
