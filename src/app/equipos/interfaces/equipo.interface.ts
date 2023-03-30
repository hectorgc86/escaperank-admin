import { Noticia } from 'src/app/noticias/interfaces/noticia.interface';
import { Partida } from 'src/app/partidas/interfaces/partida.interface';
import { Usuario } from 'src/app/usuarios/interfaces/usuario.interface';
import { EquiposUsuarios } from './equipos_usuarios.interface';

export interface Equipo {
  id?: number;
  nombre?: string | null;
  avatar?: string | null;
  activado?: boolean;
  equiposUsuarios?: EquiposUsuarios[] | null;
  partidas?: Partida[] | null;
  noticias?: Noticia[] | null;
}

export interface EquipoRequest {
  nombre?: string | null;
  usuarios?: Usuario[] | null;
  activado?: boolean;
}
