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
import { CategoriaCardComponent } from "./categoria-card/categoria-card.component";
import { TematicaCardComponent } from "./tematica-card/tematica-card.component";
import { PublicoCardComponent } from "./publico-card/publico-card.component";
import { DificultadCardComponent } from "./dificultad-card/dificultad-card.component";
import { SalasRoutingModule } from "./salas-routing.module";
import { SalasExploreComponent } from "./salas-explore/salas-explore.component";
import { CarouselModule } from "ngx-owl-carousel-o";

@NgModule({
  declarations: [
    SalasFormComponent,
    SalasDetailsComponent,
    SalasListComponent,
    SalasCardComponent,
    SalasExploreComponent,
    CategoriaCardComponent,
    TematicaCardComponent,
    PublicoCardComponent,
    DificultadCardComponent,
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
  ],
})
export class SalasModule {}
