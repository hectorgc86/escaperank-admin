import { SalasPublico } from "./salas_publico.interface";

export interface Publico {
  id?: string | null;
  tipo?: string | null;
  icono?: string | null;
  colorIcono?: string | null;
  numeroSalas?: number;
  salasPublico?: SalasPublico[] | null;
}
