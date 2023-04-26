import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Noticia, NoticiaResponse } from 'src/app/noticias/interfaces/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticiasURL: string;
  constructor(private readonly http: HttpClient) {
    this.noticiasURL = "noticias";
   }
  addNoticia(noticiaCreada: Noticia):Observable<Noticia> {
    return this.http.post<NoticiaResponse>(`${this.noticiasURL}/new`,noticiaCreada)
    .pipe(map((response:NoticiaResponse) => response.noticia));;
  }

  updateNoticia(noticiaCreada: Noticia): Observable<Noticia> {
    return this.http
    .put<NoticiaResponse>(`${this.noticiasURL}/${noticiaCreada.id}`, noticiaCreada)
    .pipe(map((response: NoticiaResponse) => response.noticia));
  }

}
