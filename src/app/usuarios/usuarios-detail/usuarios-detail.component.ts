import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImageUtils } from "src/app/utils/image-utils";
import { Usuario } from "../interfaces/usuario.interface";

@Component({
  selector: "app-usuarios-detail",
  templateUrl: "./usuarios-detail.component.html",
  styleUrls: ["./usuarios-detail.component.scss"],
})
export class UsuariosDetailComponent implements OnInit {
  imageUtils = ImageUtils;
  @Input() usuario: Usuario;

  edad: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.usuario = this.route.snapshot.data["usuario"];
    this.calcularEdad(this.usuario.perfil!.nacido);
  }

  calcularEdad(fechaNacimiento: string | null | undefined) {
    const convertAge = new Date(fechaNacimiento!);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.edad = Math.floor(
      timeDiff / (1000 * 3600 * 24) / 365
    ) as unknown as string;
  }
}
