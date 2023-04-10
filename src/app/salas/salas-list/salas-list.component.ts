import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "../interfaces/salas_categorias.interface";
import { SalasService } from "../services/salas.service";

@Component({
  selector: "app-salas-list",
  templateUrl: "./salas-list.component.html",
  styleUrls: ["./salas-list.component.scss"],
})
export class SalasListComponent implements OnInit {
  salas: Sala[];

  constructor(private router: Router, private salasService: SalasService) {}

  ngOnInit(): void {
    this.salasService
      .getSalasPromocionadas()
      .subscribe((salas) => (this.salas = salas));
  }

  nuevaSala() {
    this.router.navigate(["/salas/nueva"]);
  }
}
