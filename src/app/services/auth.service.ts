import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/response/auth-response.model';
import { RegisterRequest } from '../models/request/register-request.model';
import { LoginRequest } from '../models/request/login-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'AccessToken';

  constructor(private readonly http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 < Date.now();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role || null;
    }
    return null;
  }

  isAdmin(): boolean {
    const userRole = this.getUserRole();
    return userRole === 'administrator';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  async login(name: string, password: string): Promise<AuthResponse> {
    const payload: LoginRequest = { name, password };

    return await firstValueFrom(
      this.http.post<AuthResponse>(
        `${environment.SERVER_URL}/auth/login`,
        payload,
      ),
    );
  }

  async register(
    name: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<AuthResponse> {
    const payload: RegisterRequest = { name, password, passwordConfirmation };

    return await firstValueFrom(
      this.http.post<AuthResponse>(
        `${environment.SERVER_URL}/auth/register`,
        payload,
      ),
    );
  }
}
