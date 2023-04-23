import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsuariosDetailComponent } from "./usuarios-detail/usuarios-detail.component";
import { UsuariosFormComponent } from "./usuarios-form/usuarios-form.component";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FeatherIconModule } from "../core/feather-icon/feather-icon.module";
import { UsuariosListComponent } from "./usuarios-list/usuarios-list.component";
import { UsuariosCardComponent } from "./usuarios-card/usuarios-card.component";
import { RouterModule } from "@angular/router";
import { UsuariosNavbarComponent } from './usuarios-navbar/usuarios-navbar.component';

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
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    RouterModule,
  ],
})
export class UsuariosModule {}
