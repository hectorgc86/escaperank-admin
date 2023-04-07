import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SalasService } from "../services/salas.service";
import { Sala } from "../interfaces/salas_categorias.interface";

@Component({
  selector: "app-salas-details",
  templateUrl: "./salas-details.component.html",
  styleUrls: ["./salas-details.component.scss"],
})
export class SalasDetailsComponent implements OnInit {
  sala: Sala;

  constructor(
    private route: ActivatedRoute,
    private salasService: SalasService
  ) {}

  ngOnInit(): void {
    const salaId = this.route.snapshot.paramMap.get("id") as string;
    this.salasService.getSala(salaId).subscribe((sala) => (this.sala = sala));
  }
}
