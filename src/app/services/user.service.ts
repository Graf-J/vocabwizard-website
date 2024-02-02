import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user-response.model';
import { Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private reloadUsersSubject = new Subject<void>();
  reloadUsers$ = this.reloadUsersSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  triggerUsersReload() {
    this.reloadUsersSubject.next();
  }

  async getUsers(): Promise<UserResponse[]> {
    return await firstValueFrom(
      this.http.get<UserResponse[]>(`${environment.SERVER_URL}/users`),
    );
  }

  async deleteUser(id: string) {
    return await firstValueFrom(
      this.http.delete(`${environment.SERVER_URL}/users/${id}`),
    );
  }
}
