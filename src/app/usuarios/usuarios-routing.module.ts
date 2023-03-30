import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginActivateGuard } from "../auth/guards/login-activate.guard";
import { UsuarioResolver } from "./resolvers/usuario.resolver";
import { UsuariosDetailComponent } from "./usuarios-detail/usuarios-detail.component";
import { UsuariosFormComponent } from "./usuarios-form/usuarios-form.component";

const routes: Routes = [
  {
    path: "perfil",
    component: UsuariosDetailComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
  {
    path: "edit",
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
