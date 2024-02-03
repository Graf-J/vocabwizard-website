import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { OverallDeckResponse } from '../models/response/overall-deck-response.model';
import { Language } from '../models/language.enum';
import { CreateDeckRequest } from '../models/request/create-deck-request.model';
import { DeckResponse } from '../models/response/deck-response.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private reloadDecksSubject = new Subject<void>();
  reloadDecks$ = this.reloadDecksSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  triggerDecksReload() {
    this.reloadDecksSubject.next();
  }

  async getDecks(): Promise<OverallDeckResponse[]> {
    return await firstValueFrom(
      this.http.get<OverallDeckResponse[]>(`${environment.SERVER_URL}/decks`),
    );
  }

  async getDeck(id: string): Promise<DeckResponse> {
    return await firstValueFrom(
      this.http.get<DeckResponse>(`${environment.SERVER_URL}/decks/${id}`),
    );
  }

  async createDeck(
    name: string,
    learningRate: number,
    fromLang: Language,
    toLang: Language,
  ) {
    const payload: CreateDeckRequest = {
      name,
      learningRate,
      fromLang,
      toLang,
    };

    return await firstValueFrom(
      this.http.post(`${environment.SERVER_URL}/decks`, payload),
    );
  }

  async swap(id: string) {
    return await firstValueFrom(
      this.http.patch(`${environment.SERVER_URL}/decks/${id}/swap`, {}),
    );
  }

  async import(id: string) {
    return await firstValueFrom(
      this.http.post(`${environment.SERVER_URL}/decks/import`, { deckId: id }),
    );
  }

  async deleteDeck(id: string) {
    return await firstValueFrom(
      this.http.delete(`${environment.SERVER_URL}/decks/${id}`),
    );
  }
}
