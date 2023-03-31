import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria.interface';

@Component({
  selector: 'app-categoria-card',
  templateUrl: './categoria-card.component.html',
  styleUrls: ['./categoria-card.component.css'],
})
export class CategoriaCardComponent {
  @Input() categoria!: Categoria;
  storageUrl: string;

  constructor() {
    this.storageUrl = `${environment.storageUrl}`;
  }
}
