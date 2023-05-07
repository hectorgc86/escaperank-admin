import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Equipo, EquipoRequest } from "../interfaces/equipo.interface";

@Injectable({
  providedIn: "root",
})
export class EquiposService {
  private equiposURL: string;

  constructor(private readonly http: HttpClient) {
    this.equiposURL = "equipos";
  }

  getEquipo(id?: number): Observable<Equipo> {
    return this.http
      .get<Equipo>(`${this.equiposURL}/${id}`)
      .pipe(map((response) => response));
  }

  postEquipo(equipoRequest: EquipoRequest): Observable<EquipoRequest> {
    return this.http
      .post<EquipoRequest>(`${this.equiposURL}`, { equipoRequest })
      .pipe(map((response) => response));
  }

  deleteEquipo(id?: number): Observable<void> {
    return this.http
      .delete<void>(`${this.equiposURL}/${id}`);
  }
}
