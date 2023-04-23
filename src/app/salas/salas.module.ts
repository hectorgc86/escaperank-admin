import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalasCardComponent } from "./salas-card/salas-card.component";
import { SalasDetailsComponent } from "./salas-details/salas-details.component";
import { SalasListComponent } from "./salas-list/salas-list.component";
import {NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SalasRoutingModule } from "./salas-routing.module";
import { SalasExploreComponent } from "./salas-explore/salas-explore.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ScrollTrackerDirective } from "./directives/scroll-tracker.directive";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { QrListComponent } from './qr-list/qr-list.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
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
    CarouselModule,
    NgxMapboxGLModule,
    QRCodeModule,
    NgbModule,
  ],
})
export class SalasModule {}
