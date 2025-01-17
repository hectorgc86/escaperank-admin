import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoticiasListComponent } from "./noticias-list/noticias-list.component";
import { NoticiasDetailsComponent } from "./noticias-details/noticias-details.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFormsModule } from "ngx-custom-validators";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { NoticiasCardComponent } from "./noticias-card/noticias-card.component";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "https://httpbin.org/post",
  maxFilesize: 50,
  acceptedFiles: "image/*",
};
const routes: Routes = [
  {
    path: "",
    component: NoticiasListComponent,
  }
];

@NgModule({
  declarations: [
    NoticiasListComponent,
    NoticiasCardComponent,
    NoticiasDetailsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgbDatepickerModule,
    DropzoneModule,
  ],
  exports: [RouterModule, NoticiasCardComponent],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    }, // Ngx-dropzone-wrapper
  ],
})
export class NoticiasModule {}
