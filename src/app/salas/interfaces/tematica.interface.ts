import { SalasTematicas } from "./salas_tematicas.interface";

export interface Tematica {
  id?: string | null;
  tipo?: string | null;
  icono?: string | null;
  colorIcono?: string | null;
  numeroSalas?: number;
  salasTematicas?: SalasTematicas[] | null;
}
