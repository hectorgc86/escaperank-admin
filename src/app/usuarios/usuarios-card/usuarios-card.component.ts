import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { Usuario } from "../interfaces/usuario.interface";
import { ImageUtils } from "src/app/core/utils/image-utils";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsuariosService } from "../services/usuarios.service";

@Component({
  selector: "app-usuarios-card",
  templateUrl: "./usuarios-card.component.html",
  styleUrls: ["./usuarios-card.component.scss"],
})
export class UsuariosCardComponent implements OnInit {
  @Input() usuario: Usuario;
  @Input() checkEliminar: boolean;
  imageUtils = ImageUtils;

  constructor(
    private modalService: NgbModal,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {}

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        if (result === "eliminar") {
          this.usuariosService
            .deleteAmistad(
              localStorage.getItem("usuarioId") as unknown as number,
              this.usuario.id
            )
            .subscribe(() => location.reload());
        }
      })
      .catch((res) => {});
  }
}
