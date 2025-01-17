import { Partida } from "src/app/partidas/interfaces/partida.interface";
import { Companyia } from "./companyia.interface";
import { Dificultad } from "./dificultad.interface";
import { SalasCategorias } from "./salas_categorias.interface";
import { SalasPublico } from "./salas_publico.interface";
import { SalasTematicas } from "./salas_tematicas.interface";
import { Valoracion } from "./valoracion.interface";
import { Categoria } from "./categoria.interface";
import { Publico } from "./publico.interface";
import { Tematica } from "./tematica.interface";

export interface Sala {
  id?: string | null;
  nombre?: string | null;
  promocionada?: boolean;
  duracion?: string | null;
  minimoJugadores?: number | null;
  maximoJugadores?: number | null;
  precioMinimo?: string | null;
  descripcion?: string | null;
  precioMaximo?: string | null;
  urlReserva?: string | null;
  edadPublico?: string | null;
  proximamente?: string | null;
  visto?: string | null;
  modoCombate?: string | null;
  textoCombate?: string | null;
  salaIgual?: string | null;
  enOferta?: string | null;
  textoOferta?: string | null;
  numeroResenyas?: string | null;
  regaloBonus?: string | null;
  disponibleIngles?: string | null;
  adaptadoMinusvalidos?: string | null;
  adaptadoCiegos?: string | null;
  adaptadoSordos?: string | null;
  adaptadoEmbarazadas?: string | null;
  noClaustrofobicos?: string | null;
  imagenAncha?: string | null;
  imagenEstrecha?: string | null;
  jugadoresIncluidos?: string | null;
  precioJugadorAdicional?: string | null;
  validez?: string | null;
  comoReservar?: string | null;
  terminosReserva?: string | null;
  otrosDatos?: string | null;
  companyiaId?: string | null;
  dificultadId?: string | null;
  companyia?: Companyia;
  dificultad?: Dificultad;
  partidas?: Partida[] | null;
  categorias?: Categoria[] | null;
  publico?: Publico[] | null;
  tematicas?: Tematica[] | null;
  valoraciones?: Valoracion[] | null;
  desactivada?:boolean;
}


export interface SalaResponse {
  sala: Sala;
}
