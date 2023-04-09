import { Component, Input } from "@angular/core";
import { Noticia } from "../interfaces/noticia.interface";
import { ImageUtils } from "src/app/utils/image-utils";

@Component({
  selector: "app-noticias-card",
  templateUrl: "./noticias-card.component.html",
  styleUrls: ["./noticias-card.component.scss"],
})
export class NoticiasCardComponent {
  @Input() noticia!: Noticia;
  imageUtils = ImageUtils;

  constructor() {}
}
