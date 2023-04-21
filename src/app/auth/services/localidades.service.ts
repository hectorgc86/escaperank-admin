import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalidadesService {
  private provinciasURL: string;
  private ciudadesURL: string;

  loginChange$ = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.provinciasURL = "provincias";
    this.ciudadesURL = "ciudades";
  }
}
