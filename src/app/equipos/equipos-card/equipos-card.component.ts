import { Component, Input, OnInit } from "@angular/core";
import { Equipo } from "../interfaces/equipo.interface";
import { ImageUtils } from "src/app/utils/image-utils";

@Component({
  selector: "app-equipos-card",
  templateUrl: "./equipos-card.component.html",
  styleUrls: ["./equipos-card.component.scss"],
})
export class EquiposCardComponent implements OnInit {
  @Input() equipo: Equipo;
  imageUtils = ImageUtils;

  constructor() {}

  ngOnInit(): void {}
}
