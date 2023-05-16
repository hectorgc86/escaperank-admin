import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasMainComponent } from './estadisticas-main/estadisticas-main.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule, NgbDateParserFormatter, NgbModule, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
import { EstadisticasCardComponent } from './estadisticas-card/estadisticas-card.component';
import { SalasMainComponent } from './salas-main/salas-main.component';
import { NoticiasMainComponent } from './noticias-main/noticias-main.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SalasFormComponent } from './salas-form/salas-form.component';
import { CustomFormsModule } from 'ngx-custom-validators';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { NoticiasFormComponent } from './noticias-form/noticias-form.component';
import { CustomAdapter, CustomNgbDateParserFormatter } from '../utils/date-parser-formatter';
import { SalaResolver } from './resolvers/sala.resolver';
import { NoticiaResolver } from './resolvers/noticia.resolver';

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
    path: 'salas/:id/edit',
    component: SalasFormComponent,
    resolve: {
      sala: SalaResolver,
    },
  },
  {
    path: 'noticias',
    component: NoticiasMainComponent
  },
  {
    path: 'noticias/nueva',
    component: NoticiasFormComponent
  },
  {
    path: 'noticias/:id/edit',
    component: NoticiasFormComponent,
    resolve: {
      noticia: NoticiaResolver,
    },
  }
]
@NgModule({
  declarations: [
    EstadisticasMainComponent,
    EstadisticasCardComponent,
    SalasMainComponent,
    NoticiasMainComponent,
    NoticiasFormComponent,
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
    NgbModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgbDatepickerModule,
    DropzoneModule,
    NgSelectModule,
  ], providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
    { provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter },
    { provide: NgbDateAdapter, useClass: CustomAdapter }, // Ngx-dropzone-wrapper

  ],
})
export class AdministracionModule { }