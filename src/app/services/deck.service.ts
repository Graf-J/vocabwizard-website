import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private readonly http: HttpClient) {}

  async getDecks(): Promise<any> {
    return await firstValueFrom(
      this.http.get(`${environment.SERVER_URL}/decks`),
    );
  }
}
