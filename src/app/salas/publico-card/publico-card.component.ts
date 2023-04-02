import { Component, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { Publico } from "../interfaces/publico.interface";

@Component({
  selector: "app-publico-card",
  templateUrl: "./publico-card.component.html",
  styleUrls: ["./publico-card.component.scss"],
})
export class PublicoCardComponent {
  @Input() publico!: Publico;
  storageUrl: string;

  constructor() {
    this.storageUrl = `${environment.storageUrl}`;
  }
}
