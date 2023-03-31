import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tematica } from '../interfaces/tematica.interface';

@Injectable({
  providedIn: 'root',
})
export class TematicasService {
  private tematicasURL: string;

  constructor(private readonly http: HttpClient) {
    this.tematicasURL = 'tematicas';
  }

  getTematicas(): Observable<Tematica[]> {
    return this.http
      .get<Tematica[]>(this.tematicasURL)
      .pipe(map((response) => response));
  }
}
