import { Sala } from './sala.interface';

export interface Valoracion {
  id?: number;
  estrellas?: number | null;
  comentario?: string | null;
  salaId?: string | null;
  sala?: Sala;
}
