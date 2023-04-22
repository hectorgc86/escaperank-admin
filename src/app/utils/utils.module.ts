import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinDateDirective } from "./validators/min-date.directive";
import { EmailDirective } from "./validators/email.directive";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
  declarations: [EmailDirective, MinDateDirective, SpinnerComponent],
  imports: [CommonModule],
  exports: [EmailDirective, MinDateDirective, SpinnerComponent],
})
export class UtilsModule {}
