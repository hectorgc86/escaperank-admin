import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Sala } from "../interfaces/salas_categorias.interface";
import { ImageUtils } from "src/app/core/utils/image-utils";
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
  logeado: boolean;
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
    this.logeado = true;
    this.zoom = 17;
    this.sala = this.route.snapshot.data["sala"];
    this.ranking = this.route.snapshot.data["ranking"];

    if(localStorage.getItem("rol") == null){
      this.logeado = false;
    }

    this.longitud = parseFloat(this.sala.companyia?.longitud || "0");
    this.latitud = parseFloat(this.sala.companyia?.latitud || "0");
  }
}
