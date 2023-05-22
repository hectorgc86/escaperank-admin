import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { PartidasRoutingModule } from "./partidas-routing.module";
import { PartidasListComponent } from "./partidas-list/partidas-list.component";
import { PartidasNewComponent } from "./partidas-new/partidas-new.component";

import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { WebcamModule } from 'ngx-webcam';
@NgModule({
  declarations: [PartidasListComponent, PartidasNewComponent],
  imports: [
    CommonModule,
    PartidasRoutingModule,
    ZXingScannerModule,
    NgbDropdownModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    WebcamModule
  ],
})
export class PartidasModule {}
