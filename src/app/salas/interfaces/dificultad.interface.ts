import { Sala } from './sala.interface';

export interface Dificultad {
  id?: string | null;
  tipo?: string | null;
  numeroSalas?: number;
  salas?: Sala[] | null;
}
