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

  loggedFacebook(resp: fb.StatusResponse) {
    this.authService.loginFacebook(resp.authResponse.accessToken).subscribe({
      next: () => this.router.navigate(["/noticias"]),
      error: (e) => (this.error = "Error de login en facebook"),
    });
  }

  loggedGoogle(user: gapi.auth2.GoogleUser) {
    this.authService.loginGoogle(user.getAuthResponse().id_token).subscribe({
      next: () => this.router.navigate(["/noticias"]),
      error: (e) => (this.error = "Error de login en google"),
    });
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem("isLoggedin", "true");
    localStorage.setItem("usuarioId", "1");
    localStorage.setItem(
      "tokenAcceso",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwNDI3NTk4fQ.UIJcunw14rFJ-YirLoIQbN7FEm5k1I_4DmLScYjFTU4"
    );

    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
