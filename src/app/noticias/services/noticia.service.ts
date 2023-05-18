import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Noticia } from "../interfaces/noticia.interface";

@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  private noticiasURL: string;

  constructor(private readonly http: HttpClient) {
    this.noticiasURL = "noticias";
  }
  getNoticia(id: number): Observable<Noticia> {
    return this.http
      .get<Noticia>(`${this.noticiasURL}/${id}`)
      .pipe(map((response) => response));
  }
  getNoticias(): Observable<Noticia[]> {
    return this.http
      .get<Noticia[]>(this.noticiasURL)
      .pipe(map((response) => response));
  }
  getNoticiasUsuario(id: number): Observable<Noticia[]> {
    return this.http
      .get<Noticia[]>(`${this.noticiasURL}/usuario/${id}`)
      .pipe(map((response) => response));
  }
}
