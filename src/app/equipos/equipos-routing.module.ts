import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EquiposFormComponent } from "./equipos-form/equipos-form.component";
import { LoginActivateGuard } from "../auth/guards/login-activate.guard";
import { EquiposDetailComponent } from "./equipos-detail/equipos-detail.component";
import { EquiposListComponent } from "./equipos-list/equipos-list.component";

const routes: Routes = [
  {
    path: "",
    component: EquiposListComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      //usuario: EquipoResolver,
    },
  },
  {
    path: "editar",
    component: EquiposFormComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      //usuario: EquipoResolver,
    },
  },
  {
    path: ":id",
    component: EquiposDetailComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      //usuario: EquipoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquiposRoutingModule {}
