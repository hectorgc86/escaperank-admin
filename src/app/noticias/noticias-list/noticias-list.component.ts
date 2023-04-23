import { Component, OnInit } from "@angular/core";
import { Noticia } from "../interfaces/noticia.interface";
import { NoticiasService } from "../services/noticia.service";
import { Sala } from "src/app/salas/interfaces/sala.interface";
import { SalasService } from "src/app/salas/services/salas.service";
import { ImageUtils } from "src/app/utils/image-utils";

@Component({
  selector: "app-noticias-list",
  templateUrl: "./noticias-list.component.html",
  styleUrls: ["./noticias-list.component.scss"],
})
export class NoticiasListComponent implements OnInit {
  noticias: Noticia[];
  idUsuario: number;
  salas: Sala[];
  imageUtils = ImageUtils;

  constructor(
    private noticiasService: NoticiasService,
    private salasService: SalasService
  ) {
    this.noticias = [];
    this.idUsuario = localStorage.getItem("usuarioId") as unknown as number;
  }

  ngOnInit(): void {
    this.noticiasService
      .getNoticiasUsuario(this.idUsuario)
      .subscribe((noticias) => (this.noticias = noticias));
    this.salasService
      .getSalasPromocionadas()
      .subscribe((salas) => (this.salas = salas));
  }
}
