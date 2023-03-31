import { Publico } from "./publico.interface";
import { Sala } from "./sala.interface";

export interface SalasPublico {
  salaId?: string | null;
  publicoId?: string | null;
  publico?: Publico;
  sala?: Sala;
}

