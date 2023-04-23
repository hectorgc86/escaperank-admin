import { Component, Input, OnInit } from "@angular/core";
import { ImageUtils } from "src/app/utils/image-utils";
import { Usuario } from "../interfaces/usuario.interface";

@Component({
  selector: "app-usuarios-navbar",
  templateUrl: "./usuarios-navbar.component.html",
  styleUrls: ["./usuarios-navbar.component.scss"],
})
export class UsuariosNavbarComponent implements OnInit {
  @Input() usuario: Usuario;
  imageUtils = ImageUtils;

  constructor() {}

  ngOnInit(): void {}
}
