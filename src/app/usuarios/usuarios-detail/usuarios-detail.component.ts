import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImageUtils } from "src/app/utils/image-utils";
import { Amigo, Usuario } from "../interfaces/usuario.interface";
import { Noticia } from "src/app/noticias/interfaces/noticia.interface";
import { UsuariosService } from "../services/usuarios.service";
import { Estado } from "../interfaces/estado.interface";

@Component({
  selector: "app-usuarios-detail",
  templateUrl: "./usuarios-detail.component.html",
  styleUrls: ["./usuarios-detail.component.scss"],
})
export class UsuariosDetailComponent implements OnInit {
  imageUtils = ImageUtils;
  @Input() usuario: Usuario;
  noticias: Noticia[];
  amigosPendientes: Amigo[];
  amigos: Amigo[];
  edad: string;

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
  ) {
    this.amigosPendientes = [];
  }

  ngOnInit(): void {
    this.usuario = this.route.snapshot.data["usuario"];
    this.calcularEdad(this.usuario.perfil!.nacido);
    this.usuariosService
      .getPublicacionesUsuario(this.usuario.id)
      .subscribe((noticias) => (this.noticias = noticias));
    this.usuariosService
      .getAmigosUsuario(this.usuario.id)
      .subscribe((amigos: Amigo[]) => {
        this.amigosPendientes = amigos.filter(
          (amigoPendiente) => amigoPendiente.estado == Estado.pendiente
        );
        this.amigos = amigos.filter((amigo) => amigo.estado == Estado.aceptado);
      });
  }

  calcularEdad(fechaNacimiento: string | null | undefined) {
    const convertAge = new Date(fechaNacimiento!);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.edad = Math.floor(
      timeDiff / (1000 * 3600 * 24) / 365
    ) as unknown as string;
  }

  aceptarSolicitudAmistad(idAmigoPendiente: number) {
    this.usuariosService
      .putAmistad(this.usuario.id, idAmigoPendiente)
      .subscribe(() => location.reload());
  }
}
