import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Sala } from "../interfaces/salas_categorias.interface";
import { ImageUtils } from "src/app/utils/image-utils";
import { Ranking } from "src/app/administracion/interfaces/estadisticas.interface";

@Component({
  selector: "app-salas-details",
  templateUrl: "./salas-details.component.html",
  styleUrls: ["./salas-details.component.scss"],
})
export class SalasDetailsComponent implements OnInit {
  sala: Sala;
  ranking: Ranking;
  zoom: number;
  latitud: number;
  longitud: number;
  tamanyosTrofeo: string[];
  imageUtils = ImageUtils;

  constructor(private route: ActivatedRoute) {
    this.tamanyosTrofeo = [
      "mdi-48px",
      "mdi-36px",
      "mdi-24px",
      "mdi-18px",
      "mdi-18px",
    ];
  }

  ngOnInit(): void {
    this.zoom = 17;
    this.sala = this.route.snapshot.data["sala"];
    this.ranking = this.route.snapshot.data["ranking"];

    this.longitud = parseFloat(this.sala.companyia?.longitud || "0");
    this.latitud = parseFloat(this.sala.companyia?.latitud || "0");
  }
}
