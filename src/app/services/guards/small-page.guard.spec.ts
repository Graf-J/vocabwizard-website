import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { smallPageGuard } from './small-page.guard';

describe('smallPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => smallPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
