import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dificultad } from '../interfaces/dificultad.interface';

@Component({
  selector: 'app-dificultad-card',
  templateUrl: './dificultad-card.component.html',
  styleUrls: ['./dificultad-card.component.css'],
})
export class DificultadCardComponent {
  @Input() dificultad!: Dificultad;
  storageUrl: string;

  constructor() {
    this.storageUrl = `${environment.storageUrl}`;
  }
}
