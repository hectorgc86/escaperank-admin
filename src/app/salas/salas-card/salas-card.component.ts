import { Component, Input, OnInit, Output } from "@angular/core";
import { Sala } from "../interfaces/salas_categorias.interface";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-salas-card",
  templateUrl: "./salas-card.component.html",
  styleUrls: ["./salas-card.component.scss"],
})
export class SalasCardComponent implements OnInit {
  @Input() sala!: Sala;
  @Output() urlSala: string;

  constructor() {}

  ngOnInit(): void {}

  getImagenSala() {
    let sufijo = "";
    let urlSala = `${environment.storageUrl}`;

    if (this.sala.imagenAncha !== null) {
      sufijo = "/salas/";
      urlSala += sufijo + this.sala.imagenAncha;
    } else {
      urlSala += "/default.png";
    }
    this.urlSala = urlSala;
  }
}
