import { Sala, SalasCategorias } from './salas_categorias.interface';

export interface Categoria {
  id?: string | null;
  tipo?: string | null;
  numeroSalas?: number;
  salasCategorias?: SalasCategorias[] | null;
}
