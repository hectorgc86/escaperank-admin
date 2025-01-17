import { Component, Input, OnInit } from "@angular/core";
import { ImageUtils } from "src/app/core/utils/image-utils";
import { Usuario } from "../interfaces/usuario.interface";

@Component({
  selector: "app-usuarios-navbar",
  templateUrl: "./usuarios-navbar.component.html",
  styleUrls: ["./usuarios-navbar.component.scss"],
})
export class UsuariosNavbarComponent implements OnInit {
  @Input() usuario: Usuario;
  @Input() modo: string;

  imageUtils = ImageUtils;

  constructor() {}

  ngOnInit(): void {}
}
