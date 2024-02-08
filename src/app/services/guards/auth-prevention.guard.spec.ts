import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authPreventionGuard } from './auth-prevention.guard';
import { AuthService } from '../auth.service';

describe('authPreventionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      authPreventionGuard(...guardParameters),
    );
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access for unauthenticated user', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = executeGuard(null as any, null as any);

    expect(result).toBeTrue();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalledOnceWith();
  });

  it('should deny access authenticated user', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = executeGuard(null as any, null as any);

    expect(result).toBeFalse();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalledOnceWith();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
