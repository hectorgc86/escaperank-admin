import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Sala } from "../interfaces/salas_categorias.interface";
import { ImageUtils } from "src/app/utils/image-utils";

@Component({
  selector: "app-salas-details",
  templateUrl: "./salas-details.component.html",
  styleUrls: ["./salas-details.component.scss"],
})
export class SalasDetailsComponent implements OnInit {
  sala: Sala;
  zoom: number;
  latitud: number;
  longitud: number;

  imageUtils = ImageUtils;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.zoom = 17;
    this.sala = this.route.snapshot.data["sala"];

    this.longitud = parseFloat(this.sala.companyia?.longitud || "0");
    this.latitud = parseFloat(this.sala.companyia?.latitud || "0");
  }
}
