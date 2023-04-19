import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { PartidasRoutingModule } from './partidas-routing.module';
import { PartidasListComponent } from './partidas-list/partidas-list.component';
import { PartidasNewComponent } from './partidas-new/partidas-new.component';


import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    PartidasListComponent,
    PartidasNewComponent
  ],
  imports: [
    CommonModule,
    PartidasRoutingModule,
    ZXingScannerModule,
    NgbDropdownModule
  ]
})
export class PartidasModule { }
