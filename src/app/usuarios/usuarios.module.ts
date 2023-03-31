import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsuariosDetailComponent } from "./usuarios-detail/usuarios-detail.component";
import { UsuariosFormComponent } from "./usuarios-form/usuarios-form.component";
import { UsuariosRoutingModule } from "./usuarios-routing.module";

@NgModule({
  declarations: [UsuariosDetailComponent, UsuariosFormComponent],
  imports: [CommonModule, UsuariosRoutingModule],
})
export class UsuariosModule {}
