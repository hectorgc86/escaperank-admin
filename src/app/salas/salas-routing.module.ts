import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginActivateGuard } from "../auth/guards/login-activate.guard";
import { QrListComponent } from "./qr-list/qr-list.component";
import { SalaResolver } from "./resolvers/sala.resolver";
import { SalasDetailsComponent } from "./salas-details/salas-details.component";
import { SalasExploreComponent } from "./salas-explore/salas-explore.component";
import { SalasFormComponent } from "../administracion/salas-form/salas-form.component";
import { SalasListComponent } from "./salas-list/salas-list.component";
import { SalaRankingResolver } from "./resolvers/sala-ranking.resolver";

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
    path: "qr",
    component: QrListComponent,
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
    resolve: {
      sala: SalaResolver,
      ranking: SalaRankingResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalasRoutingModule {}
