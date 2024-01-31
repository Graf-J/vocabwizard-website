import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const password = control.parent?.get('password')?.value;
  const passwordConfirmation = control.value;

  // Check if the passwords match
  return password === passwordConfirmation ? null : { passwordMismatch: true };
}
