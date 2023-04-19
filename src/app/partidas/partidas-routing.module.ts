import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartidasListComponent } from './partidas-list/partidas-list.component';
import { PartidasNewComponent } from './partidas-new/partidas-new.component';

const routes: Routes = [
  {
    path: "",
    component: PartidasListComponent,
  },
  {
    path: "nueva",
    component: PartidasNewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartidasRoutingModule { }