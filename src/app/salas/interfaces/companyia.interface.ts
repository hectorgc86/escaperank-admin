import { Noticia } from "src/app/noticias/interfaces/noticia.interface";
import { Ciudad } from "./ciudad.interface";
import { Sala } from "./sala.interface";

export interface Companyia {
  id?: string | null;
  nombre?: string | null;
  direccion?: string | null;
  email?: string | null;
  telefono?: string | null;
  web?: string | null;
  tripAdvisor?: string | null;
  facebook?: string | null;
  latitud?: string | null;
  longitud?: string | null;
  numeroLocal?: string | null;
  googleMaps?: string | null;
  numeroOpiniones?: string | null;
  codigoPostal?: string | null;
  instagram?: string | null;
  puntuacion?: string | null;
  rango?: string | null;
  ciudadId?: string | null;
  ciudad?: Ciudad;
  noticias?: Noticia[] | null;
  salas?: Sala[] | null;
}

export interface CompanyiaRequest {
  nombre?: string | null;
  direccion?: string | null;
  email?: string | null;
  telefono?: string | null;
  web?: string | null;
  tripAdvisor?: string | null;
  facebook?: string | null;
  latitud?: string | null;
  longitud?: string | null;
  numeroLocal?: string | null;
  googleMaps?: string | null;
  numeroOpiniones?: string | null;
  codigoPostal?: string | null;
  instagram?: string | null;
  puntuacion?: string | null;
  rango?: string | null;
}
