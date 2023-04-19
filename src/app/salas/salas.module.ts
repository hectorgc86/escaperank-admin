import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalasFormComponent } from "./salas-form/salas-form.component";
import { SalasCardComponent } from "./salas-card/salas-card.component";
import { SalasDetailsComponent } from "./salas-details/salas-details.component";
import { SalasListComponent } from "./salas-list/salas-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFormsModule } from "ngx-custom-validators";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { NgSelectModule } from "@ng-select/ng-select";
import { SalasRoutingModule } from "./salas-routing.module";
import { SalasExploreComponent } from "./salas-explore/salas-explore.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ScrollTrackerDirective } from "./directives/scroll-tracker.directive";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { QrListComponent } from './qr-list/qr-list.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    SalasFormComponent,
    SalasDetailsComponent,
    SalasListComponent,
    SalasCardComponent,
    SalasExploreComponent,
    ScrollTrackerDirective,
    QrListComponent,
  ],
  imports: [
    CommonModule,
    SalasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgbDatepickerModule,
    DropzoneModule,
    NgSelectModule,
    CarouselModule,
    NgxMapboxGLModule,
    QRCodeModule
  ],
})
export class SalasModule {}
