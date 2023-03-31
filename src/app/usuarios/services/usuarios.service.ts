import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Perfil } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuariosURL: string;
  private perfilesURL: string;

  constructor(private readonly http: HttpClient) {
    this.usuariosURL = 'usuarios';
    this.perfilesURL = 'perfiles';
  }

  getPerfil(id?: number): Observable<Perfil> {
    return this.http
      .get<Perfil>(`${this.perfilesURL}/${id}`)
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
