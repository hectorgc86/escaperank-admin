import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private categoriasURL: string;

  constructor(private readonly http: HttpClient) {
    this.categoriasURL = 'categorias';
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http
      .get<Categoria[]>(this.categoriasURL)
      .pipe(map((response) => response));
  }
}
