import { Equipo } from "src/app/equipos/interfaces/equipo.interface";
import { Companyia } from "src/app/salas/interfaces/companyia.interface";
import { Usuario } from "src/app/usuarios/interfaces/usuario.interface";

export interface Noticia {
  id?: number;
  fecha?: string;
  titular?: string | null;
  textoCorto?: string | null;
  textoLargo?: string | null;
  imagen?: string | null;
  link?: string | null;
  promocionada?: boolean | null;
  numeroFavoritos?: number | null;
  numeroComentarios?: number | null;
  companyiaId?: string | null;
  usuarioId?: number | null;
  equipoId?: number | null;
  companyia?: Companyia;
  usuario?: Usuario;
  equipo?: Equipo;
  imagenBase64?:string |null;
}

export interface NoticiaResponse {
  noticia: Noticia;
}