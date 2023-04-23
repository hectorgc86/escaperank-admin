import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../interfaces/usuario.interface";
import { ImageUtils } from "src/app/utils/image-utils";

@Component({
  selector: "app-usuarios-card",
  templateUrl: "./usuarios-card.component.html",
  styleUrls: ["./usuarios-card.component.scss"],
})
export class UsuariosCardComponent implements OnInit {
  @Input() usuario: Usuario;
  imageUtils = ImageUtils;

  constructor() {}

  ngOnInit(): void {}
}
