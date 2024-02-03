import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { DeckService } from 'src/app/services/deck.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { DeckResponse } from 'src/app/models/response/deck-response.model';
import { getWordErrorMessage } from 'src/app/utils/error-parser';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  deck: DeckResponse | undefined;
  isDeckLoading: boolean = true;
  isWordLoading: boolean = false;
  generalErrorMessage: string = '';

  wordFormSubscription: Subscription | undefined;

  wordForm = new FormGroup({
    word: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly deckService: DeckService,
    private readonly snackBar: MatSnackBar,
    private readonly cardService: CardService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const deckId = params['deckId'];
      this.fetchDeck(deckId);
    });

    this.wordFormSubscription = this.wordForm.valueChanges.subscribe(() => {
      this.resetGeneralError();
    });
  }

  fetchDeck(id: string) {
    this.wordForm.disable();

    this.deckService
      .getDeck(id)
      .then((res) => {
        this.deck = res;
      })
      .catch((error: HttpErrorResponse) => {
        let errorMessage: string;
        if (typeof error.error.message === 'string') {
          errorMessage = error.error.message;
        } else {
          errorMessage = error.error.message[0];
        }
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
          data: { message: errorMessage },
        });

        this.router.navigate(['']);
      })
      .finally(() => {
        this.isDeckLoading = false;
        this.wordForm.enable();
      });
  }

  onSubmit(): void {
    if (this.wordForm.valid) {
      this.isWordLoading = true;

      this.cardService
        .createCard(this.deck!.id, this.wordForm.value.word!)
        .then(() => {
          this.wordForm.patchValue({ word: '' });
          this.wordForm.controls['word'].setErrors(null);

          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3 * 1000,
            data: { message: 'Card successfully added' },
          });
        })
        .catch((error: HttpErrorResponse) => {
          this.setGeneralError(error);
        })
        .finally(() => {
          this.isWordLoading = false;
        });
    }
  }

  getWordError(): string {
    const errorKey = Object.keys(this.wordForm.get('word')!.errors!)[0];
    return getWordErrorMessage(errorKey);
  }

  private setGeneralError(error: HttpErrorResponse) {
    this.generalErrorMessage = error.error.message;
    this.wordForm.controls['word'].setErrors({ incorrect: true });
  }

  private resetGeneralError() {
    this.generalErrorMessage = '';
    if (this.wordForm.get('word')?.errors?.['incorrect']) {
      this.wordForm.controls['word'].setErrors(null);
    }
  }
}
