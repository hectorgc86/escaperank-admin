import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Companyia, CompanyiaResponse } from 'src/app/salas/interfaces/companyia.interface';
@Injectable({
  providedIn: 'root'
})


export class CompanyiasService {
  private companyiasURL: string;

  constructor(private readonly http: HttpClient) {
    this.companyiasURL = "companyias";
   }

   
getCompanyiasAValidar(): Observable<Companyia[]> {
  return this.http.get<Companyia[]>(`${this.companyiasURL}/nuevas`)
  .pipe(map((response) => response));;

}
validarCompanyia(companyia: Companyia): Observable<Companyia> {
  return this.http
  .put<CompanyiaResponse>(`${this.companyiasURL}/${companyia.id}/validar`, companyia)
  .pipe(map((response: CompanyiaResponse) => response.companyia));
}

activarCompanyia(companyia: Companyia): Observable<Companyia> {
  return this.http
  .put<CompanyiaResponse>(`${this.companyiasURL}/${companyia.id}/activar`, companyia)
  .pipe(map((response: CompanyiaResponse) => response.companyia));
}

desactivarCompanyia(companyia: Companyia): Observable<Companyia> {
  return this.http
  .put<CompanyiaResponse>(`${this.companyiasURL}/${companyia.id}/desactivar`, companyia)
  .pipe(map((response: CompanyiaResponse) => response.companyia));
}

invalidarCompanyia(companyia: Companyia): Observable<Companyia> {
  return this.http
  .put<CompanyiaResponse>(`${this.companyiasURL}/${companyia.id}/invalidar`, companyia)
  .pipe(map((response: CompanyiaResponse) => response.companyia));
}
}