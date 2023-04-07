import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable, of } from "rxjs";
import { Sala } from "../interfaces/sala.interface";
import { SalasService } from "../services/salas.service";

@Injectable({
  providedIn: "root",
})
export class SalaResolver implements Resolve<Sala> {
  constructor(private salasService: SalasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Sala> {
    let salaId = !isNaN(route.params["id"]) ? null : route.params["id"];

    return this.salasService.getSala(salaId).pipe(
      catchError(() => {
        this.router.navigate(["/salas"]);
        return EMPTY;
      })
    );
  }
}
