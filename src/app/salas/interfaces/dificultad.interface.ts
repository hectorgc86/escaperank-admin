import { Sala } from "./sala.interface";

export interface Dificultad {
  id?: string | null;
  tipo?: string | null;
  icono?: string | null;
  colorIcono?: string | null;
  numeroSalas?: number;
  salas?: Sala[] | null;
}
