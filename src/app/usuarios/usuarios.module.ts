import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsuariosDetailComponent } from "./usuarios-detail/usuarios-detail.component";
import { UsuariosFormComponent } from "./usuarios-form/usuarios-form.component";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import {
  NgbAccordionModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FeatherIconModule } from "../core/feather-icon/feather-icon.module";
import { UsuariosListComponent } from "./usuarios-list/usuarios-list.component";
import { UsuariosCardComponent } from "./usuarios-card/usuarios-card.component";
import { RouterModule } from "@angular/router";
import { UsuariosNavbarComponent } from "./usuarios-navbar/usuarios-navbar.component";
import { NoticiasModule } from "../noticias/noticias.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { QRCodeModule } from "angularx-qrcode";
import { NgApexchartsModule } from "ng-apexcharts";
import { CustomFormsModule } from "ngx-custom-validators";
import { DropzoneModule } from "ngx-dropzone-wrapper";

@NgModule({
  declarations: [
    UsuariosDetailComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    UsuariosCardComponent,
    UsuariosNavbarComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NoticiasModule,
    RouterModule,
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
  ],
  exports: [UsuariosNavbarComponent],
})
export class UsuariosModule {}
