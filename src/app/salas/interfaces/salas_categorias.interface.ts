import { Categoria } from './categoria.interface';
import { Sala } from './sala.interface';

export interface SalasCategorias {
  salaId?: string | null;
  categoriaId?: string | null;
  categoria?: Categoria;
  sala?: Sala;
}
export { Sala };
