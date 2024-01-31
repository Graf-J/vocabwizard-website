import { AbstractControl, FormGroup } from '@angular/forms';
import { Language } from 'src/app/models/language.enum';

export function includeEnLanguageValidator(
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

  // Return valid if one value isn't already set
  if (!language || !otherLanguage) {
    return null;
  }

  // Check if one Language is English
  return language !== Language.en && otherLanguage !== Language.en
    ? { missingEn: true }
    : null;
}
