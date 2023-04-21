import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable, of } from "rxjs";
import { SalasService } from "../services/salas.service";
import { Ranking } from "src/app/administracion/interfaces/estadisticas.interface";

@Injectable({
  providedIn: "root",
})
export class SalaRankingResolver implements Resolve<Ranking> {
  constructor(private salasService: SalasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Ranking> {
    let salaId = !isNaN(route.params["id"]) ? null : route.params["id"];

    return this.salasService.getRankingSala(salaId).pipe(
      catchError(() => {
        this.router.navigate(["/salas"]);
        return EMPTY;
      })
    );
  }
}
