import { environment } from "src/environments/environment";
import { Noticia } from "../noticias/interfaces/noticia.interface";
import { Sala } from "../salas/interfaces/salas_categorias.interface";
import { Perfil } from "../usuarios/interfaces/perfil.interface";

export class ImageUtils {
  private static defaultImage = "/default.png";

  static getImagenNoticia(noticia: Noticia,companyia:boolean=false): string {
    let sufijo = "";
    let urlNoticia = `${environment.storageUrl}`;

    if (noticia.imagen !== null) {
      sufijo = noticia.promocionada ? "/companyias/" : "/partidas/";
      if (companyia)
        sufijo="/noticias/";
      urlNoticia += sufijo + noticia.imagen;
    } else {
      urlNoticia += this.defaultImage;
    }
    return urlNoticia;
  }

  static getImagenUsuario(perfil: Perfil): string {
    let sufijo = "/usuarios/";
    let urlNoticia = `${environment.storageUrl}`;

    if (perfil.avatar !== null) {
      urlNoticia += sufijo + perfil.avatar;
    } else {
      urlNoticia += sufijo + this.defaultImage;
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
