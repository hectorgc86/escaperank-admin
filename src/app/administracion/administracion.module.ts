import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasMainComponent } from './estadisticas-main/estadisticas-main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
import { EstadisticasCardComponent } from './estadisticas-card/estadisticas-card.component';
import { SalasMainComponent } from './salas-main/salas-main.component';
import { NoticiasMainComponent } from './noticias-main/noticias-main.component';
import { NoticiasNewComponent } from './noticias-new/noticias-new.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SalasFormComponent } from './salas-form/salas-form.component';
import { CustomFormsModule } from 'ngx-custom-validators';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  maxFilesize: 1,
  acceptedFiles: "image/*",
  autoProcessQueue:false
};
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
    component: SalasFormComponent
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
    SalasFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    QRCodeModule, 
   
    ReactiveFormsModule,
    CustomFormsModule,
    NgbDatepickerModule,
    DropzoneModule,
    NgSelectModule,
  ], providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    }, // Ngx-dropzone-wrapper
  ],
})
export class AdministracionModule { }
