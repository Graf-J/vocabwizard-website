import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { CardResponse } from '../models/response/card-response.model';
import { CardInfoResponse } from '../models/response/card-info-response.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private reloadCardsSubject = new Subject<void>();
  reloadCards$ = this.reloadCardsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  triggerCardsReload() {
    this.reloadCardsSubject.next();
  }

  async getCards(deckId: string): Promise<CardInfoResponse[]> {
    return await firstValueFrom(
      this.http.get<CardInfoResponse[]>(
        `${environment.SERVER_URL}/decks/${deckId}/cards`,
      ),
    );
  }

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

  async deleteCard(deckId: string, cardId: string) {
    return await firstValueFrom(
      this.http.delete(
        `${environment.SERVER_URL}/decks/${deckId}/cards/${cardId}`,
      ),
    );
  }
}
