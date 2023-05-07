import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Amigo, Usuario } from "../interfaces/usuario.interface";
import { UsuariosService } from "../services/usuarios.service";
import { Estado } from "../interfaces/estado.interface";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-usuarios-list",
  templateUrl: "./usuarios-list.component.html",
  styleUrls: ["./usuarios-list.component.scss"],
})
export class UsuariosListComponent implements OnInit {
  usuario: Usuario;
  amigos: Amigo[];
  checkEliminar: boolean;
  emailAmigo = "";

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.checkEliminar = false;
    this.usuario = this.route.snapshot.data["usuario"];
    this.usuariosService
      .getAmigosUsuario(this.usuario.id)
      .subscribe(
        (amigos: Amigo[]) =>
          (this.amigos = amigos.filter(
            (amigo) => amigo.estado == Estado.aceptado
          ))
      );
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        if(this.emailAmigo == null || this.emailAmigo == ""){
          console.log("No se ha informado de un email")
        }else{
          this.usuariosService
          .postAmistad(this.usuario.id, this.emailAmigo)
          .subscribe(() => location.reload());
        }
      })
      .catch((res) => {});
  }

  modoEliminar(): void {
    if (!this.checkEliminar) {
      this.checkEliminar = true;
    } else {
      this.checkEliminar = false;
    }
  }
}
