import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";
import { LoginRequest } from "../interfaces/login.interface";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  textoUsuario = "";
  textoContrasenya = "";
  checkRecordar: boolean = false;

  error = "";
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    const textoUsuario = localStorage.getItem("textoUsuario");
    const textoContrasenya = localStorage.getItem("textoContrasenya");
    const checkRecordar = !!localStorage.getItem("checkRecordar");

    if (textoUsuario && textoContrasenya && checkRecordar) {
      this.textoUsuario = textoUsuario;
      this.textoContrasenya = textoContrasenya;
      this.checkRecordar = checkRecordar;
    }
  }

  login() {
    const loginRequest: LoginRequest = {
      usuario: this.textoUsuario,
      contrasenya: this.textoContrasenya,
    };

    if (this.checkRecordar) {
      localStorage.setItem("textoUsuario", this.textoUsuario);
      localStorage.setItem("textoContrasenya", this.textoContrasenya);
      localStorage.setItem("checkRecordar", JSON.stringify(this.checkRecordar));
    } else {
      localStorage.removeItem("textoUsuario");
      localStorage.removeItem("textoContrasenya");
      localStorage.removeItem("checkRecordar");
    }

    this.authService.login(loginRequest).subscribe({
      next: () => {
        let rol = localStorage.getItem("rol");
        if (rol === "GAMEMASTER") {
          this.router.navigate(["/administracion/estadisticas"]);
        } else {
          this.router.navigate(["/noticias"]);
        }
      },
      error: (e) =>
        Swal.fire({
          icon: "error",
          title: "Error haciendo login",
          text: "Usuario o contraseña inválidos",
        }),
    });
  }
}
