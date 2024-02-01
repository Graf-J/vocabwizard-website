export function getNameErrorMessage(errorKey: string): string {
  switch (errorKey) {
    case 'required':
      return 'Required';
    case 'minlength':
      return 'At least 4 characters';
    case 'incorrect':
      return '';
    default:
      return 'Invalid';
  }
}

export function getPasswordErrorMessage(errorKey: string): string {
  switch (errorKey) {
    case 'required':
      return 'Required';
    case 'minlength':
      return 'At least 6 characters';
    case 'pattern':
      return 'At least 1 number and 1 special character';
    case 'incorrect':
      return '';
    default:
      return 'Invalid';
  }
}

export function getPasswordConfirmationErrorMessage(errorKey: string): string {
  switch (errorKey) {
    case 'required':
      return 'Required';
    case 'passwordMismatch':
      return 'Does not match Password';
    case 'incorrect':
      return '';
    default:
      return 'Invalid';
  }
}

export function getLanguageErrorMessage(errorKey: string): string {
  switch (errorKey) {
    case 'required':
      return 'Required';
    case 'missingEn':
      return 'One Language has to be English';
    case 'sameLanguage':
      return 'Languages can not be the same';
    case 'incorrect':
      return '';
    default:
      return 'Invalid';
  }
}

export function getIdErrorMessage(errorKey: string): string {
  switch (errorKey) {
    case 'required':
      return 'Required';
    case 'incorrect':
      return '';
    default:
      return 'Invalid';
  }
}
