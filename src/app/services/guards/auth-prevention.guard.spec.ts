import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authPreventionGuard } from './auth-prevention.guard';

describe('authPreventionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      authPreventionGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
