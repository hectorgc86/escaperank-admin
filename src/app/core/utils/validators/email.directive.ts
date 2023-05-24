import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

@Directive({
  selector: '[emailEquals]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true },
  ],
})
export class EmailDirective implements Validator {
  constructor() {}

  validate(group: FormGroup): ValidationErrors | null {
    let fields = Object.keys(group.controls);
    if (
      fields.length === 2 &&
      group.get(fields[0])!.value !== group.get(fields[1])!.value
    ) {
      return { emailEquals: true };
    }
    return null;
  }
}
