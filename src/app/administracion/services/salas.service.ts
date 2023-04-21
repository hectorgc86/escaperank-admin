import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Sala } from 'src/app/salas/interfaces/sala.interface';
import { Estadisticas } from '../interfaces/estadisticas.interface';
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


}
