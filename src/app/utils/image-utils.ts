import { environment } from "src/environments/environment";
import { Noticia } from "../noticias/interfaces/noticia.interface";
import { Sala } from "../salas/interfaces/salas_categorias.interface";

export class ImageUtils {
  private static defaultImage = "/default.png";

  static getImagenNoticia(noticia: Noticia): string {
    let sufijo = "";
    let urlNoticia = `${environment.storageUrl}`;

    if (noticia.imagen !== null) {
      sufijo = noticia.promocionada ? "/companyias/" : "/partidas/";
      urlNoticia += sufijo + noticia.imagen;
    } else {
      urlNoticia += this.defaultImage;
    }
    return urlNoticia;
  }

  static getImagenSala(sala: Sala, tipo: string): string {
    let sufijo = "/salas";
    let urlSala = `${environment.storageUrl}`;

    if (tipo === "estrechas") {
      if (sala.imagenEstrecha !== null) {
        sufijo += "/estrechas/";
        urlSala += sufijo + sala.imagenEstrecha;
      } else {
        urlSala += this.defaultImage;
      }
    } else if (tipo === "anchas") {
      if (sala.imagenAncha !== null) {
        sufijo += "/anchas/";
        urlSala += sufijo + sala.imagenAncha;
      } else {
        urlSala += this.defaultImage;
      }
    }

    return urlSala;
  }
}
