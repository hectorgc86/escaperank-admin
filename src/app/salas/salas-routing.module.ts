import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginActivateGuard } from "../auth/guards/login-activate.guard";
import { SalaResolver } from "./resolvers/sala.resolver";
import { SalasDetailsComponent } from "./salas-details/salas-details.component";
import { SalasExploreComponent } from "./salas-explore/salas-explore.component";
import { SalasFormComponent } from "./salas-form/salas-form.component";
import { SalasListComponent } from "./salas-list/salas-list.component";

const routes: Routes = [
  {
    path: "",
    component: SalasExploreComponent,
  },
  {
    path: "buscar",
    component: SalasListComponent,
  },
  {
    path: "editar",
    component: SalasFormComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      sala: SalaResolver,
    },
  },
  {
    path: ":id",
    component: SalasDetailsComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      sala: SalaResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalasRoutingModule {}
