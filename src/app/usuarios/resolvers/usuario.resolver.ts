import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { Perfil } from '../interfaces/perfil.interface';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioResolver implements Resolve<Perfil> {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Perfil> {
    let usuarioId = isNaN(route.params['id'])
      ? localStorage.getItem('usuarioId')
      : route.params['id'];
    return this.usuariosService.getPerfil(usuarioId).pipe(
      catchError(() => {
        this.router.navigate(['/salas']);
        return EMPTY;
      })
    );
  }
}
