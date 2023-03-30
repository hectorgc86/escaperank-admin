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

@Component({
  selector: "app-salas-explore",
  templateUrl: "./salas-explore.component.html",
  styleUrls: ["./salas-explore.component.css"],
})
export class SalasExploreComponent implements OnInit {
  @Output() sala!: Sala;

  salas: Sala[];
  categorias: Categoria[];
  tematicas: Tematica[];
  publicos: Publico[];
  dificultades: Dificultad[];

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
    this.salasService
      .getSalasPromocionadas()
      .subscribe((salas) => (this.salas = salas));
    this.categoriasService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
    this.tematicasService
      .getTematicas()
      .subscribe((tematicas) => (this.tematicas = tematicas));
    this.publicoService
      .getPublico()
      .subscribe((publico) => (this.publicos = publico));
    this.dificultadesService
      .getDificultades()
      .subscribe((dificultades) => (this.dificultades = dificultades));
  }
}
