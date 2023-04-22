import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { MD5 } from "crypto-js";
import { Login, LoginRequest } from "../interfaces/login.interface";
import { RegistroRequest } from "../interfaces/registro.interface";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private logged = false;
  private authURL: string;

  loginChange$ = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService
  ) {
    this.authURL = "auth";
  }

  private setLogged(logged: boolean) {
    this.logged = logged;
    this.loginChange$.emit(logged);
  }

  isLogged(): Observable<boolean> {
    const token = localStorage.getItem("tokenAcceso");

    if (this.logged) {
      return of(true);
    } else if (!token) {
      return of(false);
    } else {
      return this.http.get<void>(`${this.authURL}/validar`).pipe(
        map(() => {
          this.setLogged(true);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this.resetearLocalStorage();
          return of(false);
        })
      );
    }
  }

  login(loginRequest: LoginRequest): Observable<void> {
    loginRequest.contrasenya = this.calcularMD5(loginRequest.contrasenya!);

    return this.http.post<Login>(`${this.authURL}/login`, loginRequest).pipe(
      map((resp) => {
        localStorage.setItem("usuarioId", resp.usuarioId!);
        localStorage.setItem("rol", resp.rol!);

        if (resp.companyiaId != null) {
          localStorage.setItem("companyiaId", resp.companyiaId!);
        }
        localStorage.setItem("tokenAcceso", resp.tokenAcceso!);

        this.setLogged(true);

        this.usuariosService
          .getPerfil(resp.usuarioId as unknown as number)
          .subscribe((perfil) =>
            localStorage.setItem("perfil", JSON.stringify(perfil))
          );
      })
    );
  }

  logout(): void {
    this.resetearLocalStorage();
    this.setLogged(false);
  }

  registrar(registroRequest: RegistroRequest): Observable<void> {
    registroRequest.usuario!.contrasenya = this.calcularMD5(
      registroRequest.usuario!.contrasenya!
    );
    return this.http.post<void>(`${this.authURL}/registrar`, registroRequest);
  }

  private calcularMD5(contrasenya: string): string {
    const result = MD5(contrasenya);
    return result.toString();
  }

  private resetearLocalStorage() {
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("companyiaId");
    localStorage.removeItem("rol");
    localStorage.removeItem("tokenAcceso");
    localStorage.removeItem("perfil");
  }
}
