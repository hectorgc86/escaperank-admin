export interface Estadisticas {
  numPartidas: NumPartidas[];
  partidasMes: PartidasMes[];
  tiempos?: Tiempos[] ;
  rankings?: Ranking[] ;
}
export interface Ranking {
  sala: string;
  id: string;
  companyia_id: string;
  tiempos: {
    equipo: string;
    fecha: string;
    tiempo: string;
  }[];
}

export interface NumPartidas {
  sala_id: string;
  id: string;
  companyia_id: string;
  numPartidas:number;
  nombre:string;
  partidasMes:PartidasMes[];
 
}

export interface PartidasMes {
  anio: number;
  mes: number;
  cantidad_partidas:number;
  nombre_sala:string;
 
}
export interface Tiempos {
  partida_mas_corta: string;
  partida_mas_larga: string;
  tiempo_promedio: string;
 nombre:string;
}
