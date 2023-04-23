import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";
import { LoginRequest } from "../interfaces/login.interface";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  usuario = "";
  contrasenya = "";
  error = "";
  returnUrl: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  login() {
    const loginRequest: LoginRequest = {
      usuario: this.usuario,
      contrasenya: this.contrasenya,
    };
    this.authService.login(loginRequest).subscribe({
      next: () => this.router.navigate(["/noticias"]),
      error: (e) =>
        Swal.fire({
          icon: "error",
          title: "Error haciendo login",
          text: "Usuario o contraseña inválidos",
        }),
    });
  }
}
