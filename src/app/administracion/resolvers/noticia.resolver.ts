import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { catchError, EMPTY, Observable, of } from "rxjs";
import { Noticia } from "src/app/noticias/interfaces/noticia.interface";
import { NoticiasService } from "src/app/noticias/services/noticia.service";
import { Sala } from "src/app/salas/interfaces/salas_categorias.interface";


@Injectable({
  providedIn: "root",
})
export class NoticiaResolver implements Resolve<Noticia> {
  constructor(
    private noticiasService: NoticiasService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Noticia> {
    let noticiaId = route.params["id"];

    return this.noticiasService.getNoticia(noticiaId).pipe(
      catchError(() => {
        this.router.navigate(["/administracion/noticias"]);
        return EMPTY;
      })
    );
  }
}
