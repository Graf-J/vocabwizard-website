import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const smallPageGuard: CanActivateFn = (route, _state) => {
  const deckId = route.paramMap.get('deckId');

  const router = inject(Router);

  if (window.innerWidth < 1200) {
    return true;
  } else {
    router.navigate(['view-cards', deckId]);
    return false;
  }
};
