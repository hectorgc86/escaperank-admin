import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EquiposRoutingModule } from "./equipos-routing.module";
import { EquiposListComponent } from "./equipos-list/equipos-list.component";
import { EquiposCardComponent } from "./equipos-card/equipos-card.component";
import { EquiposDetailComponent } from "./equipos-detail/equipos-detail.component";
import { EquiposFormComponent } from "./equipos-form/equipos-form.component";
import { UsuariosModule } from "../usuarios/usuarios.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    EquiposListComponent,
    EquiposCardComponent,
    EquiposDetailComponent,
    EquiposFormComponent,
  ],
  imports: [CommonModule, EquiposRoutingModule, UsuariosModule, FormsModule, NgSelectModule, ReactiveFormsModule
  ],
})
export class EquiposModule {}
