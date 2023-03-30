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
    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
