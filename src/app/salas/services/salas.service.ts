import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Sala } from "../interfaces/sala.interface";

@Injectable({
  providedIn: "root",
})
export class SalasService {
  private salasURL: string;

  constructor(private readonly http: HttpClient) {
    this.salasURL = "salas";
  }

  getSalas(
    grupo: string,
    tipo: string,
    offset: number,
    limit: number,
    termino: string | null
  ): Observable<Sala[]> {
    if (termino != null) {
      termino = `&busqueda=${termino}`;
    } else {
      termino = "";
    }

    return this.http
      .get<Sala[]>(
        `${this.salasURL}?grupo=${grupo}&tipo=${tipo}${termino}&offset=${offset}&limit=${limit}`
      )
      .pipe(map((response) => response));
  }

  getSalasPromocionadas(): Observable<Sala[]> {
    return this.http
      .get<Sala[]>(`${this.salasURL}?grupo=Promocionada`)
      .pipe(map((response) => response));
  }

  getSala(id: string): Observable<Sala> {
    return this.http
      .get<Sala>(`${this.salasURL}/${id}`)
      .pipe(map((response) => response));
  }

  addSala(sala: Sala): Observable<Sala> {
    return this.http
      .post<Sala>(this.salasURL, sala)
      .pipe(map((response) => response));
  }

  putSala(sala: Sala): Observable<Sala> {
    return this.http
      .put<Sala>(`${this.salasURL}/${sala.id}`, sala)
      .pipe(map((response) => response));
  }

  deleteSala(id: number): Observable<void> {
    return this.http.delete<void>(`${this.salasURL}/${id}`);
  }
}
