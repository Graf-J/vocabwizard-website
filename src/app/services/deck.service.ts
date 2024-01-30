import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { OverallDeckResponse } from '../models/response/overall-deck-response.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private readonly http: HttpClient) {}

  async getDecks(): Promise<OverallDeckResponse[]> {
    return await firstValueFrom(
      this.http.get<OverallDeckResponse[]>(`${environment.SERVER_URL}/decks`),
    );
  }
}
