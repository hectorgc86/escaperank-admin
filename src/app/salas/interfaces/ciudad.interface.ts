import { Companyia } from './companyia.interface';
import { Provincia } from './provincia.interface';

export interface Ciudad {
  id?: string | null;
  nombre?: string | null;
  ciudadOrigen?: string | null;
  latitud?: string | null;
  longitud?: string | null;
  provinciaId?: string | null;
  provincia?: Provincia;
  companyias?: Companyia[] | null;
}
