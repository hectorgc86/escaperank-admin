import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Sala } from "../interfaces/salas_categorias.interface";
import { SalasService } from "../services/salas.service";
import { ImageUtils } from "../../utils/image-utils";

@Component({
  selector: "app-salas-list",
  templateUrl: "./salas-list.component.html",
  styleUrls: ["./salas-list.component.scss"],
})
export class SalasListComponent implements OnInit {
  @Output() scrollingFinished = new EventEmitter<void>();

  salas: Sala[];
  grupo: string;
  tipo: string;
  termino: string;
  offset: number;
  limit: number;
  imageUtils = ImageUtils;

  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salasService: SalasService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.grupo = "";
    this.tipo = "";
    this.termino = "";
    this.offset = 0;
    this.limit = 20;

    if (this.route.snapshot.queryParamMap.get("grupo") !== null) {
      this.grupo = this.route.snapshot.queryParamMap.get("grupo") as string;
    }

    if (this.route.snapshot.queryParamMap.get("tipo") !== null) {
      this.tipo = this.route.snapshot.queryParamMap.get("tipo") as string;
    }

    this.salasService
      .getSalas(this.grupo, this.tipo, this.offset, this.limit, this.termino)
      .subscribe((salas) => {
        this.salas = salas;
        this.isLoading = false;
      });
  }

  nuevaSala() {
    this.router.navigate(["/salas/nueva"]);
  }

  buscar(termino: string) {
    this.termino = termino;
    this.offset = 0;
    this.salasService
      .getSalas(this.grupo, this.tipo, this.offset, this.limit, termino)
      .subscribe((salas) => (this.salas = salas));
  }

  onScrollingFinished() {
    this.scrollingFinished.emit();
    this.offset += 20;
    this.salasService
      .getSalas(this.grupo, this.tipo, this.offset, this.limit, this.termino)
      .subscribe((salas) => {
        this.salas = [...this.salas, ...salas];
      });
  }
}
