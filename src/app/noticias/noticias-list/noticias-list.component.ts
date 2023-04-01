import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Noticia } from "../interfaces/noticia.interface";
import { NoticiasService } from "../services/noticia.service";

@Component({
  selector: "app-noticias-list",
  templateUrl: "./noticias-list.component.html",
  styleUrls: ["./noticias-list.component.scss"],
})
export class NoticiasListComponent implements OnInit {
  noticias: Noticia[];
  idUsuario: number;

  constructor(
    private router: Router,
    private noticiasService: NoticiasService
  ) {
    this.noticias = [];
    this.idUsuario = localStorage.getItem("usuarioId") as unknown as number;
  }

  ngOnInit(): void {
    this.noticiasService
      .getNoticiasUsuario(this.idUsuario)
      .subscribe((noticias) => (this.noticias = noticias));
  }

  nuevaNoticia() {
    this.router.navigate(["/noticias/nueva"]);
  }
}
