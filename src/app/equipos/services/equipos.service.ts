import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Equipo } from "../interfaces/equipo.interface";

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

  // putProfile(name: string, email: string): Observable<void> {
  //   return this.http.put<void>(`${this.usuariosURL}/me`, { name, email });
  // }

  // putPhoto(avatar: string): Observable<string> {
  //   return this.http
  //     .put<string>(`${this.usuariosURL}/me/photo`, { avatar })
  //     .pipe(map((response) => response));
  // }

  // putPassword(password: string): Observable<void> {
  //   return this.http.put<void>(`${this.usuariosURL}/me/password`, password);
  // }
}
