import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasFormComponent } from './salas-form/salas-form.component';
import { SalasCardComponent } from './salas-card/salas-card.component';
import { SalasDetailsComponent } from './salas-details/salas-details.component';
import { SalasListComponent } from './salas-list/salas-list.component';



@NgModule({
  declarations: [
    SalasFormComponent,
    SalasCardComponent,
    SalasDetailsComponent,
    SalasListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SalasModule { }
