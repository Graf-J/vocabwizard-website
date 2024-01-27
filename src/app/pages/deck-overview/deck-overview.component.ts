import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deck-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck-overview.component.html',
  styleUrls: ['./deck-overview.component.css'],
})
export class DeckOverviewComponent implements OnInit {
  constructor(private readonly deckService: DeckService) {}

  async ngOnInit() {
    const res = await this.deckService.getDecks();
    console.log(res);
  }
}
