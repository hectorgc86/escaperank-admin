import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../services/auth.service";

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
    this.authService.login(this.usuario, this.contrasenya).subscribe({
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
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMzQ2MDk1fQ.mCUIH25oHx4lDSl0MXfuS7i1QbO9bCGyf7LdD__qQgA"
    );

    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
