import { AbstractControl, FormGroup } from '@angular/forms';

export function differentLanguageValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const parentFormGroup = control.parent as FormGroup;

  if (!parentFormGroup) {
    return null;
  }

  // Get names of Language-Controls
  const languageControlName = Object.keys(parentFormGroup.controls).find(
    (name) => parentFormGroup.get(name) === control,
  );
  const otherLanguageControlName =
    languageControlName === 'sourceLanguage'
      ? 'targetLanguage'
      : 'sourceLanguage';

  // Get values of Language-Controls
  const language = control.value;
  const otherLanguage = control.parent?.get(otherLanguageControlName)?.value;

  // Check if the Languages are the same
  return language === otherLanguage ? { sameLanguage: true } : null;
}
