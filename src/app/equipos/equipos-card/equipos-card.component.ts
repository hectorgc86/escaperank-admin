import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { Equipo } from "../interfaces/equipo.interface";
import { ImageUtils } from "src/app/utils/image-utils";
import { EquiposService } from "../services/equipos.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-equipos-card",
  templateUrl: "./equipos-card.component.html",
  styleUrls: ["./equipos-card.component.scss"],
})
export class EquiposCardComponent implements OnInit {
  @Input() equipo: Equipo;
  @Input() checkEliminar: boolean;
  imageUtils = ImageUtils;

  constructor(
    private modalService: NgbModal,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {}

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        if (result === "eliminar") {
          this.equiposService
            .deleteEquipo(
              this.equipo.id
            )
            .subscribe(() => location.reload());
        }
      })
      .catch((res) => {});
  }
}
