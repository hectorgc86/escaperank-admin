import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinDateDirective } from './validators/min-date.directive';
import { EmailDirective } from './validators/email.directive';

@NgModule({
  declarations: [EmailDirective, MinDateDirective],
  imports: [CommonModule],
  exports: [EmailDirective, MinDateDirective],
})
export class UtilsModule {}
