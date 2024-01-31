import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';
import { OverallDeckResponse } from 'src/app/models/response/overall-deck-response.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeckCardComponent } from 'src/app/components/deck-card/deck-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deck-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    DeckCardComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './deck-overview.component.html',
  styleUrls: ['./deck-overview.component.css'],
})
export class DeckOverviewComponent implements OnInit {
  constructor(private readonly deckService: DeckService) {}
  isLoading: boolean = true;
  decks: OverallDeckResponse[] | undefined = undefined;

  async ngOnInit() {
    this.deckService
      .getDecks()
      .then((res) => {
        this.decks = res;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
