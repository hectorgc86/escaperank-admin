import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasMainComponent } from './estadisticas-main/estadisticas-main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

const routes: Routes = [
  {
    path: '',
    component: EstadisticasMainComponent
  }
]

@NgModule({
  declarations: [
    EstadisticasMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule
  ]
})
export class EstadisticasModule { }
