import { Component, Output, OnInit, AfterViewInit } from "@angular/core";
import { Categoria } from "../interfaces/categoria.interface";
import { Publico } from "../interfaces/publico.interface";
import { Sala } from "../interfaces/sala.interface";
import { Tematica } from "../interfaces/tematica.interface";
import { CategoriasService } from "../services/categorias.service";
import { DificultadesService } from "../services/dificultades.service";
import { PublicoService } from "../services/publico.service";
import { SalasService } from "../services/salas.service";
import { TematicasService } from "../services/tematicas.service";
import { Dificultad } from "../interfaces/dificultad.interface";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ImageUtils } from "src/app/utils/image-utils";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-salas-explore",
  templateUrl: "./salas-explore.component.html",
  styleUrls: ["./salas-explore.component.scss"],
})
export class SalasExploreComponent implements OnInit {
  salas: Sala[];
  categorias: Categoria[];
  tematicas: Tematica[];
  publicos: Publico[];
  dificultades: Dificultad[];
  imageUtils = ImageUtils;

  isLoading: boolean;

  basicExampleOptions: OwlOptions = {
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  constructor(
    private salasService: SalasService,
    private categoriasService: CategoriasService,
    private tematicasService: TematicasService,
    private publicoService: PublicoService,
    private dificultadesService: DificultadesService
  ) {
    this.salas = [];
    this.categorias = [];
    this.tematicas = [];
    this.publicos = [];
    this.dificultades = [];
  }

  ngOnInit(): void {
    this.isLoading = true;

    const salas$ = this.salasService.getSalasPromocionadas();
    const categorias$ = this.categoriasService.getCategorias();
    const tematicas$ = this.tematicasService.getTematicas();
    const publicos$ = this.publicoService.getPublico();
    const dificultades$ = this.dificultadesService.getDificultades();

    forkJoin([salas$, categorias$, tematicas$, publicos$, dificultades$]).subscribe(
      ([salas, categorias, tematicas, publicos, dificultades]) => {
        this.salas = salas;
        this.categorias = categorias;
        this.tematicas = tematicas;
        this.publicos = publicos;
        this.dificultades = dificultades;
        this.isLoading = false;
      }
    );
  }
}
