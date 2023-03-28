import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasFormComponent } from './noticias-form/noticias-form.component';
import { NoticiasListComponent } from './noticias-list/noticias-list.component';
import { NoticiasCardComponent } from './noticias-card/noticias-card.component';
import { NoticiasDetailsComponent } from './noticias-details/noticias-details.component';



@NgModule({
  declarations: [
    NoticiasFormComponent,
    NoticiasListComponent,
    NoticiasCardComponent,
    NoticiasDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NoticiasModule { }
