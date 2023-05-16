import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sala, SalaResponse } from 'src/app/salas/interfaces/sala.interface';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalasService {
 
 
  private salasURL: string;
  constructor(private readonly http: HttpClient) {
    this.salasURL = "salas";
   }
   getSalasCompanyia(idCompanyia: string): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.salasURL}/companyia/${idCompanyia}`)
    .pipe(map((response) => response));;

  }

  addSala(salaCreada: Sala):Observable<Sala> {
    return this.http.post<SalaResponse>(`${this.salasURL}/new`,salaCreada)
    .pipe(map((response:SalaResponse) => response.sala));;
  }

  updateSala(sala: Sala): Observable<Sala> {
    return this.http
    .put<SalaResponse>(`${this.salasURL}/${sala.id}`, sala)
    .pipe(map((response: SalaResponse) => response.sala));
  }

  cerrarSala(sala: Sala): Observable<Sala> {
    return this.http
    .put<SalaResponse>(`${this.salasURL}/${sala.id}/cerrar`, sala)
    .pipe(map((response: SalaResponse) => response.sala));
  }
  abrirSala(sala: Sala): Observable<Sala> {
    return this.http
    .put<SalaResponse>(`${this.salasURL}/${sala.id}/abrir`, sala)
    .pipe(map((response: SalaResponse) => response.sala));
  }
}
