import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable, of } from "rxjs";
import { UsuariosService } from "../services/usuarios.service";
import { Usuario } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: "root",
})
export class UsuarioResolver implements Resolve<Usuario> {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
    let usuarioId = isNaN(route.params["id"])
      ? localStorage.getItem("usuarioId")
      : route.params["id"];
    return this.usuariosService.getUsuario(usuarioId).pipe(
      catchError(() => {
        this.router.navigate(["/salas"]);
        return EMPTY;
      })
    );
  }
}
