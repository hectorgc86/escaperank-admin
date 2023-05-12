import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginActivateGuard } from "../auth/guards/login-activate.guard";
import { SalasFormComponent } from "../administracion/salas-form/salas-form.component";
import { WebMainComponent } from "./web-main/web-main.component";

const routes: Routes = [
  {
    path: "",
    component: WebMainComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
