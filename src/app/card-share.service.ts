import { Injectable } from '@angular/core';
import { CardInfoResponse } from './models/response/card-info-response.model';

@Injectable({
  providedIn: 'root',
})
export class CardShareService {
  private card: CardInfoResponse | undefined;

  getData(): CardInfoResponse | undefined {
    return this.card;
  }

  setData(card: CardInfoResponse) {
    this.card = card;
  }

  constructor() {}
}
