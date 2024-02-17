import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    it('should return null if token is not set', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.getToken()).toBeNull();
    });

    it('should return the token if set', () => {
      const fakeToken = 'fakeToken';
      spyOn(localStorage, 'getItem').and.returnValue(fakeToken);
      expect(service.getToken()).toBe(fakeToken);
    });
  });

  describe('setToken', () => {
    it('should set the token in localStorage', () => {
      const fakeToken = 'fakeToken';
      service.setToken(fakeToken);
      expect(localStorage.getItem('AccessToken')).toBe(fakeToken);
    });
  });

  describe('isTokenExpired', () => {
    it('should return true for an expired token', () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzQzNDY2MSwiZXhwIjoxNzA3NDM0NjYyfQ.EcxwkOQurBvudOYeWRGbLCWuVNWyWIGCrpO0rgaWOBs';
      expect(service.isTokenExpired(expiredToken)).toBeTrue();
    });
  });

  describe('getUserRole', () => {
    it('should return null if token is not set', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.getUserRole()).toBeNull();
    });

    it('should return the admin role if set in the token', () => {
      spyOn(localStorage, 'getItem').and.returnValue(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzQzNDY2MSwiZXhwIjoxNzA3NDM0NjYyfQ.EcxwkOQurBvudOYeWRGbLCWuVNWyWIGCrpO0rgaWOBs',
      );
      expect(service.getUserRole()).toBe('administrator');
    });
  });
});
