export interface Feature {
  address: string;
  place_name: string;
  text: string;
  center: string[]; //0 -> Latitud - 1 -> Longitud
  context: Context[]; //0 -> Código postal - 1 -> Localidad - 2 -> Provincia
}

export interface Context {
  id: string;
  text: string;
}
