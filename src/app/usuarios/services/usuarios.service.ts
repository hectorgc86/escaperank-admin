import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Usuario } from "../interfaces/usuario.interface";
import { Noticia } from "src/app/noticias/interfaces/noticia.interface";
import { Equipo } from "src/app/equipos/interfaces/equipo.interface";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  private usuariosURL: string;

  constructor(private readonly http: HttpClient) {
    this.usuariosURL = "usuarios";
  }

  getUsuario(id?: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.usuariosURL}/${id}`)
      .pipe(map((response) => response));
  }

  getAmigosUsuario(id?: number): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${this.usuariosURL}/${id}/amigos`)
      .pipe(map((response) => response));
  }

  getEquiposUsuario(id?: number): Observable<Equipo[]> {
    return this.http
      .get<Equipo[]>(`${this.usuariosURL}/${id}/equipos`)
      .pipe(map((response) => response));
  }

  getPublicacionesUsuario(id?: number): Observable<Noticia[]> {
    return this.http
      .get<Noticia[]>(`${this.usuariosURL}/${id}/publicaciones`)
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
