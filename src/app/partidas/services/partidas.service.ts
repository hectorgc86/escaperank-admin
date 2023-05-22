import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Partida, PartidaResponse } from '../interfaces/partida.interface';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private partidasURL: string;
  constructor(private readonly http: HttpClient) { 
    this.partidasURL = "partidas";
  }


  addPartida(partidaCreada: Partida):Observable<Partida> {
    return this.http.post<PartidaResponse>(`${this.partidasURL}`,partidaCreada)
    .pipe(map((response:PartidaResponse) => response.partida));;
  }
}
