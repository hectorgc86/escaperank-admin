import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable, of } from "rxjs";
import { EquiposService } from "../services/equipos.service";
import { Equipo } from "../interfaces/equipo.interface";

@Injectable({
  providedIn: "root",
})
export class EquipoResolver implements Resolve<Equipo> {
  constructor(private equiposService: EquiposService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Equipo> {
    let equipoId = route.params["id"];

    return this.equiposService.getEquipo(equipoId).pipe(
      catchError(() => {
        this.router.navigate(["/salas"]);
        return EMPTY;
      })
    );
  }
}
