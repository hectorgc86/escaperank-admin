import { Ciudad } from './ciudad.interface';

export interface Provincia {
  id?: string | null;
  nombre?: string | null;
  latitud?: string | null;
  longitud?: string | null;
  ciudades?: Ciudad[] | null;
}
