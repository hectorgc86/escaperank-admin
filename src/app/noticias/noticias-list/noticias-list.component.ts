import { Component, OnInit } from "@angular/core";
import { Noticia } from "../interfaces/noticia.interface";
import { NoticiasService } from "../services/noticia.service";
import { Sala } from "src/app/salas/interfaces/sala.interface";
import { SalasService } from "src/app/salas/services/salas.service";
import { ImageUtils } from "src/app/core/utils/image-utils";
import { forkJoin } from "rxjs";

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

  isLoading: boolean;

  constructor(
    private noticiasService: NoticiasService,
    private salasService: SalasService
  ) {
    this.noticias = [];
    this.idUsuario = localStorage.getItem("usuarioId") as unknown as number;
  }

  ngOnInit(): void {
    this.isLoading = true;

    const noticias$ = this.noticiasService.getNoticiasUsuario(this.idUsuario);
    const salas$ = this.salasService.getSalasPromocionadas();

    forkJoin([noticias$, salas$]).subscribe(([noticias, salas]) => {
      this.noticias = noticias;
      this.salas = salas;
      this.isLoading = false;
    });
  }
}
