import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[minDate]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true },
  ],
})
export class MinDateDirective implements Validator {
  @Input() minDate!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (
      this.minDate &&
      control.value &&
      this.minDate.replaceAll('-', '') > control.value.replaceAll('-', '')
    ) {
      return { minDate: true }; // Error returned
    }

    return null; // No errors
  }
}
