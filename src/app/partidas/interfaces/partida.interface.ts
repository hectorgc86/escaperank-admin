import { Equipo } from 'src/app/equipos/interfaces/equipo.interface';
import { Sala } from 'src/app/salas/interfaces/sala.interface';

export interface Partida {
  id?: number;
  fecha?: string | null;
  minutos?: string | null;
  segundos?: string | null;
  imagen?: string | null;
  salaId?: string | null;
  equipoId?: number;
  sala?: Sala;
  equipo?: Equipo;
}

export interface PartidaRequest {
  fecha?: string | null;
  minutos?: string | null;
  segundos?: string | null;
  foto?: string | null;
  sala?: Sala;
  equipo?: Equipo;
}

export interface PartidaResponse {
  partida: Partida;
}
