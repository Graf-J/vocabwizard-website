import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { getNameErrorMessage } from 'src/app/utils/error-parser';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeckResponse } from 'src/app/models/response/deck-response.model';

@Component({
  selector: 'app-update-deck',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './update-deck.component.html',
  styleUrls: ['./update-deck.component.css'],
})
export class UpdateDeckComponent {
  deck: DeckResponse | undefined;
  isLoading: boolean = true;
  generalErrorMessage: string = '';

  updateDeckFormSubscription: Subscription | undefined;

  updateDeckForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    learningRate: new FormControl(1, [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly deckService: DeckService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Fetch Deck
    this.route.params.subscribe((params) => {
      const deckId = params['deckId'];
      this.fetchDeck(deckId);
    });

    // Handle reset of Errors in General Error
    this.updateDeckFormSubscription =
      this.updateDeckForm.valueChanges.subscribe(() => {
        this.resetGeneralError();
      });
  }

  ngOnDestroy(): void {
    if (this.updateDeckFormSubscription) {
      this.updateDeckFormSubscription.unsubscribe();
    }
  }

  fetchDeck(id: string) {
    this.updateDeckForm.disable();

    this.deckService
      .getDeck(id)
      .then((res: DeckResponse) => {
        this.deck = res;
        this.updateDeckForm.patchValue({
          name: res.name,
          learningRate: res.learningRate,
        });
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
        this.isLoading = false;
        this.updateDeckForm.enable();
      });
  }

  onSubmit() {
    if (this.updateDeckForm.valid) {
      this.isLoading = true;

      this.deckService
        .updateDeck(
          this.deck!.id,
          this.updateDeckForm.value.name!,
          this.updateDeckForm.value.learningRate!,
        )
        .then(() => {
          this.router.navigate(['']);
        })
        .catch((error: HttpErrorResponse) => {
          this.setGeneralError(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  getNameError() {
    const errorKey = Object.keys(this.updateDeckForm.get('name')!.errors!)[0];
    return getNameErrorMessage(errorKey);
  }

  setGeneralError(error: HttpErrorResponse) {
    if (typeof error.error.message === 'string') {
      this.generalErrorMessage = error.error.message;
    } else {
      this.generalErrorMessage = error.error.message[0];
    }
    this.updateDeckForm.controls['name'].setErrors({ incorrect: true });
    this.updateDeckForm.controls['learningRate'].setErrors({ incorrect: true });
  }

  resetGeneralError() {
    this.generalErrorMessage = '';
    if (this.updateDeckForm.get('name')?.errors?.['incorrect']) {
      this.updateDeckForm.controls['name'].setErrors(null);
    }
    if (this.updateDeckForm.get('learningRate')?.errors?.['incorrect']) {
      this.updateDeckForm.controls['learningRate'].setErrors(null);
    }
  }
}
