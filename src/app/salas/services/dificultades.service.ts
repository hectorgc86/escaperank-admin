import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dificultad } from '../interfaces/dificultad.interface';

@Injectable({
  providedIn: 'root',
})
export class DificultadesService {
  private dificultadesURL: string;

  constructor(private readonly http: HttpClient) {
    this.dificultadesURL = 'dificultades';
  }

  getDificultades(): Observable<Dificultad[]> {
    return this.http
      .get<Dificultad[]>(this.dificultadesURL)
      .pipe(map((response) => response));
  }
}
