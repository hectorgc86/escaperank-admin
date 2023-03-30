import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasFormComponent } from './salas-form/salas-form.component';
import { SalasCardComponent } from './salas-card/salas-card.component';
import { SalasDetailsComponent } from './salas-details/salas-details.component';
import { SalasListComponent } from './salas-list/salas-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
const routes: Routes = [
  {
    path: '',
    component: SalasListComponent,

  },
      {
        path: 'nueva',
        component: SalasFormComponent
      },
      {
        path: ':id',
        component: SalasDetailsComponent
      },
      {
        path: ':id/edit',
        component: SalasFormComponent
      }
]


@NgModule({
  declarations: [
    SalasFormComponent,
    SalasCardComponent,
    SalasDetailsComponent,
    SalasListComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule,FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,    NgbDatepickerModule,DropzoneModule,    NgSelectModule, // Ng-select

  ],
  exports: [RouterModule],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class SalasModule { }
