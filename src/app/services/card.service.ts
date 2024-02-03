import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { CardResponse } from '../models/response/card-response.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private readonly http: HttpClient) {}

  async getCardsToLearn(deckId: string): Promise<CardResponse[]> {
    return await firstValueFrom(
      this.http.get<CardResponse[]>(
        `${environment.SERVER_URL}/decks/${deckId}/cards/learn`,
      ),
    );
  }

  async createCard(deckId: string, word: string) {
    return await firstValueFrom(
      this.http.post(`${environment.SERVER_URL}/decks/${deckId}/cards`, {
        word,
      }),
    );
  }

  async updateConfidence(deckId: string, cardId: string, confidence: string) {
    return await firstValueFrom(
      this.http.patch(
        `${environment.SERVER_URL}/decks/${deckId}/cards/${cardId}/confidence`,
        { confidence },
      ),
    );
  }
}
