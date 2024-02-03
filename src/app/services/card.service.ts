import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private readonly http: HttpClient) {}

  async createCard(deckId: string, word: string) {
    return await firstValueFrom(
      this.http.post(`${environment.SERVER_URL}/decks/${deckId}/cards`, {
        word,
      }),
    );
  }
}
