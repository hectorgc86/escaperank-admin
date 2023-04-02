import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Usuario } from "../../usuarios/interfaces/usuario.interface";
import { MD5 } from "crypto-js";
import { Login, LoginRequest } from "../interfaces/login.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private logged = false;
  private authURL: string;

  loginChange$ = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
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
          localStorage.removeItem("usuarioId");
          localStorage.removeItem("tokenAcceso");
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
        localStorage.setItem("tokenAcceso", resp.tokenAcceso!);
        this.setLogged(true);
      })
    );
  }

  loginFacebook(token: string): Observable<void> {
    return this.http.post<Login>(`${this.authURL}/facebook`, { token }).pipe(
      map((resp) => {
        localStorage.setItem("token", resp.tokenAcceso!);
        this.setLogged(true);
      })
    );
  }

  loginGoogle(token: string): Observable<void> {
    return this.http.post<Login>(`${this.authURL}/google`, { token }).pipe(
      map((resp) => {
        localStorage.setItem("token", resp.tokenAcceso!);
        this.setLogged(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem("tokenAcceso");
    this.setLogged(false);
  }

  registrar(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.authURL}/registrar`, usuario);
  }

  private calcularMD5(contrasenya: string): string {
    const result = MD5(contrasenya);
    return result.toString();
  }
}
