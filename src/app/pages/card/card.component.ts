import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardInfoResponse } from 'src/app/models/response/card-info-response.model';
import { CardShareService } from 'src/app/card-share.service';
import { FrontCard } from 'src/app/models/front-card.model';
import { BackCard } from 'src/app/models/back-card.model';
import { VocabCardComponent } from 'src/app/components/vocab-card/vocab-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, VocabCardComponent, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  deckId!: string;
  card: CardInfoResponse | undefined;
  frontCardData!: FrontCard;
  backCardData!: BackCard;

  @ViewChild(VocabCardComponent) cardComponent!: VocabCardComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cardShareService: CardShareService,
  ) {}

  ngOnInit(): void {
    // Get Route Parameter
    this.route.params.subscribe((params) => {
      this.deckId = params['deckId'];
    });

    // Check if Card gets shared in Service and assign values
    const card = this.cardShareService.getData();
    if (!card) {
      this.router.navigate(['']);
    } else {
      this.frontCardData = {
        word: card.word,
      };
      this.backCardData = {
        translation: card.translation,
        audioLink: card.audioLink,
        phonetic: card.phonetic,
        definitions: card.definitions,
        examples: card.examples,
        synonyms: card.synonyms,
        antonyms: card.antonyms,
      };
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width >= 1200) {
      this.router.navigate(['view-cards', this.deckId]);
    }
  }

  onFlipClick() {
    this.cardComponent.flip();
  }
}
