import { Component, Input } from "@angular/core";
import { Noticia } from "../interfaces/noticia.interface";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-noticias-card",
  templateUrl: "./noticias-card.component.html",
  styleUrls: ["./noticias-card.component.scss"],
})
export class NoticiasCardComponent {
  @Input() noticia!: Noticia;

  constructor() {}

  getImagenNoticia(): string {
    let sufijo = "";
    let urlNoticia = `${environment.storageUrl}`;

    if (this.noticia.imagen !== null) {
      sufijo = this.noticia.promocionada ? "/companyias/" : "/partidas/";
      urlNoticia += sufijo + this.noticia.imagen;
    } else {
      urlNoticia += "/default.png";
    }
    return urlNoticia;
  }
}
