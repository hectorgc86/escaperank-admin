import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tematica } from '../interfaces/tematica.interface';

@Component({
  selector: 'app-tematica-card',
  templateUrl: './tematica-card.component.html',
  styleUrls: ['./tematica-card.component.css'],
})
export class TematicaCardComponent {
  @Input() tematica!: Tematica;
  storageUrl: string;

  constructor() {
    this.storageUrl = `${environment.storageUrl}`;
  }
}
