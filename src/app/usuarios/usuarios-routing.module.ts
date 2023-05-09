import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginActivateGuard } from "../auth/guards/login-activate.guard";
import { UsuarioResolver } from "./resolvers/usuario.resolver";
import { UsuariosDetailComponent } from "./usuarios-detail/usuarios-detail.component";
import { UsuariosFormComponent } from "./usuarios-form/usuarios-form.component";
import { UsuariosListComponent } from "./usuarios-list/usuarios-list.component";

const routes: Routes = [
  {
    path: "editar",
    component: UsuariosFormComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
  {
    path: ":id",
    component: UsuariosDetailComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
  {
    path: ":id/amigos",
    component: UsuariosListComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
