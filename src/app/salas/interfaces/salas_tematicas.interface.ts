import { Sala } from "./sala.interface";
import { Tematica } from "./tematica.interface";

export interface SalasTematicas {
  salaId?: string | null;
  tematicaId?: string | null;
  sala?: Sala;
  tematica?: Tematica;
}
