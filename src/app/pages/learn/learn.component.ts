import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { FlipCardFrontComponent } from 'src/app/components/flip-card/flip-card-front';
import { FlipCardBackComponent } from 'src/app/components/flip-card/flip-card-back';
import { CardService } from 'src/app/services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardResponse } from 'src/app/models/response/card-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { FrontCard } from 'src/app/models/front-card.model';
import { BackCard } from 'src/app/models/back-card.model';
import { VocabCardComponent } from 'src/app/components/vocab-card/vocab-card.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    CommonModule,
    FlipCardComponent,
    FlipCardFrontComponent,
    FlipCardBackComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    VocabCardComponent,
  ],
  viewProviders: [MatExpansionPanel],
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
})
export class LearnComponent implements OnInit {
  @ViewChild(VocabCardComponent) cardComponent!: VocabCardComponent;
  isCardFrontVisible: boolean = true;

  deckId: string = '';
  isLoading: boolean = true;
  cards: CardResponse[] = [];
  currentCard!: CardResponse;
  frontCardData?: FrontCard;
  backCardData?: BackCard;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cardService: CardService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.deckId = params['deckId'];
      this.fetchCardsToLearn(this.deckId);
    });
  }

  fetchCardsToLearn(deckId: string) {
    this.cardService
      .getCardsToLearn(deckId)
      .then((res) => {
        this.cards = res;
        if (res.length > 0) {
          this.loadFrontCard();
        } else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 5 * 1000,
            data: { message: 'No Cards to learn' },
          });

          this.router.navigate(['']);
        }
      })
      .catch((error: HttpErrorResponse) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
          data: { message: error.error.message },
        });

        this.router.navigate(['']);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  playAudio() {
    const audio = new Audio(this.currentCard.audioLink!);
    audio.play();
  }

  onCheckClick() {
    this.loadBackCard();
    this.cardComponent.flip();
    this.isCardFrontVisible = false;
  }

  onEasyClick() {
    this.updateConfidence('easy');
    this.loadFrontCard();
    this.cardComponent.flip();
    this.isCardFrontVisible = true;
  }

  onGoodClick() {
    this.updateConfidence('good');
    this.loadFrontCard();
    this.cardComponent.flip();
    this.isCardFrontVisible = true;
  }

  onHardClick() {
    this.updateConfidence('hard');
    this.loadFrontCard();
    this.cardComponent.flip();
    this.isCardFrontVisible = true;
  }

  onRepeatClick() {
    this.loadFrontCard(true);
    this.cardComponent.flip();
    this.isCardFrontVisible = true;
  }

  updateConfidence(confidence: string) {
    this.cardService
      .updateConfidence(this.deckId, this.currentCard.id, confidence)
      .catch((error: HttpErrorResponse) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
          data: { message: error.error.message },
        });
      });
  }

  loadFrontCard(repeat: boolean = false) {
    if (repeat) {
      this.cards.push(this.currentCard);
    }

    this.currentCard = this.cards.shift()!;

    if (!this.currentCard) {
      this.router.navigate(['']);
    } else {
      this.frontCardData = {
        word: this.currentCard.word,
      };
    }
  }

  loadBackCard() {
    this.backCardData = {
      translation: this.currentCard.translation,
      audioLink: this.currentCard.audioLink,
      phonetic: this.currentCard.phonetic,
      definitions: this.currentCard.definitions,
      examples: this.currentCard.examples,
      synonyms: this.currentCard.synonyms,
      antonyms: this.currentCard.antonyms,
    };
  }
}
