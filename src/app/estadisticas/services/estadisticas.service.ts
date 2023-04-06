import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Estadisticas } from "../interfaces/estadisticas.interface";

@Injectable({
  providedIn: "root",
})
export class EstadisticasService {
  private estadisticasURL: string;

  constructor(private readonly http: HttpClient) {
    this.estadisticasURL = "estadisticas";
  }

 

  getEstadisticasCompanyia(idCompanyia: string): Observable<Estadisticas> {
    return this.http.post<Estadisticas>(`${this.estadisticasURL}/companyia`, {idCompanyia:idCompanyia})
    .pipe(map((response) => response));;
  }

  getEstadisticasSala(idSala: string): Observable<Estadisticas> {
    return this.http.post<Estadisticas>(`${this.estadisticasURL}/sala`, {idSala:idSala})
    .pipe(map((response) => response));;
  }
}
