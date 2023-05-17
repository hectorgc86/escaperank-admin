import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Usuario, UsuarioRequest } from '../interfaces/usuario.interface';
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

  putUsuario(id?: number, usuarioModificado?: UsuarioRequest): Observable<UsuarioRequest> {
    return this.http
      .put<Usuario>(
        `${this.usuariosURL}/${id}`,
        usuarioModificado
      )
      .pipe(map((response) => response));
  }

  deleteUsuario(id?: number): Observable<void> {
    return this.http.delete<void>(
      `${this.usuariosURL}/${id}`
    );
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

  postAmistad(id?: number, emailAmigo?: string): Observable<Usuario> {
    return this.http
      .post<Usuario>(
        `${this.usuariosURL}/${id}/amigos`,
        { emailAmigo }
      )
      .pipe(map((response) => response));
  }

  putAmistad(id?: number, idAmigoPendiente?: number): Observable<Usuario> {
    return this.http
      .put<Usuario>(
        `${this.usuariosURL}/${id}/amigos/${idAmigoPendiente}`,
        null
      )
      .pipe(map((response) => response));
  }

  deleteAmistad(id?: number, idAmigo?: number): Observable<void> {
    return this.http.delete<void>(
      `${this.usuariosURL}/${id}/amigos/${idAmigo}`
    );
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
