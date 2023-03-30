import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Publico } from '../interfaces/publico.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicoService {
  private publicoURL: string;

  constructor(private readonly http: HttpClient) {
    this.publicoURL = 'publico';
  }

  getPublico(): Observable<Publico[]> {
    return this.http
      .get<Publico[]>(this.publicoURL)
      .pipe(map((response) => response));
  }
}
