import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRegister(e: Event) {
    e.preventDefault();
    localStorage.setItem("isLoggedin", "true");
    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate(["/"]);
    }
  }
}
