import { Component, Input, OnInit, Output } from "@angular/core";
import { Sala } from "../interfaces/salas_categorias.interface";
import { ImageUtils } from "src/app/core/utils/image-utils";

@Component({
  selector: "app-salas-card",
  templateUrl: "./salas-card.component.html",
  styleUrls: ["./salas-card.component.scss"],
})
export class SalasCardComponent implements OnInit {
  @Input() sala!: Sala;
  imageUtils = ImageUtils;

  constructor() {}

  ngOnInit(): void {}
}
