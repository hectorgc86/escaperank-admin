import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasMainComponent } from './estadisticas-main/estadisticas-main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
import { EstadisticasCardComponent } from './estadisticas-card/estadisticas-card.component';
import { SalasMainComponent } from './salas-main/salas-main.component';
import { NoticiasMainComponent } from './noticias-main/noticias-main.component';
import { NoticiasNewComponent } from './noticias-new/noticias-new.component';
import { SalasNewComponent } from './salas-new/salas-new.component';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [
  {
    path: 'estadisticas',
    component: EstadisticasMainComponent
  },
  {
    path: 'salas',
    component: SalasMainComponent
  },
  {
    path: 'salas/nueva',
    component: SalasNewComponent
  },
  {
    path: 'noticias',
    component: NoticiasMainComponent
  },
  {
    path: 'noticias/nueva',
    component: NoticiasNewComponent
  }
]
@NgModule({
  declarations: [
    EstadisticasMainComponent,
    EstadisticasCardComponent,
    SalasMainComponent,
    NoticiasMainComponent,
    NoticiasNewComponent,
    SalasNewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    QRCodeModule
  ]
})
export class AdministracionModule { }
