import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { adminGuard } from './admin.guard';
import { AuthService } from '../auth.service';

describe('adminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminGuard(...guardParameters));
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
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

  it('should allow access for admin', () => {
    authServiceSpy.isAdmin.and.returnValue(true);

    const result = executeGuard(null as any, null as any);

    expect(result).toBeTrue();
    expect(authServiceSpy.isAdmin).toHaveBeenCalledOnceWith();
  });

  it('should deny access for non-admin', () => {
    authServiceSpy.isAdmin.and.returnValue(false);

    const result = executeGuard(null as any, null as any);

    expect(result).toBeFalse();
    expect(authServiceSpy.isAdmin).toHaveBeenCalledOnceWith();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
