import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Language } from 'src/app/models/language.enum';
import { Subscription } from 'rxjs';
import { DeckService } from 'src/app/services/deck.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { differentLanguageValidator } from 'src/app/services/validators/different-language.validator';
import { includeEnLanguageValidator } from 'src/app/services/validators/include-en-language.validator';
import {
  getLanguageErrorMessage,
  getNameErrorMessage,
} from 'src/app/utils/error-parser';

@Component({
  selector: 'app-create-deck',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css'],
})
export class CreateDeckComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  generalErrorMessage: string = '';

  createDeckFormSubscription: Subscription | undefined;
  sourceLanguageSubscription: Subscription | undefined;
  targetLanguageSubscription: Subscription | undefined;

  languages = [
    {
      value: Language.en,
      viewValue: 'English',
    },
    {
      value: Language.de,
      viewValue: 'German',
    },
    {
      value: Language.es,
      viewValue: 'Spanish',
    },
    {
      value: Language.fr,
      viewValue: 'French',
    },
    {
      value: Language.it,
      viewValue: 'Italian',
    },
  ];

  createDeckForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    learningRate: new FormControl(10, [Validators.required]),
    sourceLanguage: new FormControl(null, [
      Validators.required,
      differentLanguageValidator,
      includeEnLanguageValidator,
    ]),
    targetLanguage: new FormControl(null, [
      Validators.required,
      differentLanguageValidator,
      includeEnLanguageValidator,
    ]),
  });

  constructor(
    private readonly router: Router,
    private readonly deckService: DeckService,
  ) {}

  ngOnInit(): void {
    // Handle reset of Errors in General Error
    this.createDeckFormSubscription =
      this.createDeckForm.valueChanges.subscribe(() => {
        this.resetGeneralError();
      });

    // Update flag to prevent recursion while cross-checking language-input-fields
    let languageUpdateFlag: boolean = false;

    // Update Validity of targetLanguage if sourceLanguage changes
    this.sourceLanguageSubscription = this.createDeckForm
      .get('sourceLanguage')
      ?.valueChanges.subscribe(() => {
        if (!languageUpdateFlag) {
          languageUpdateFlag = true;
          this.createDeckForm.get('targetLanguage')?.updateValueAndValidity();
          languageUpdateFlag = false;
        }
      });

    // Update Validity of sourceLanguage if targetLanguage changes
    this.targetLanguageSubscription = this.createDeckForm
      .get('targetLanguage')
      ?.valueChanges.subscribe(() => {
        if (!languageUpdateFlag) {
          languageUpdateFlag = true;
          this.createDeckForm.get('sourceLanguage')?.updateValueAndValidity();
          languageUpdateFlag = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.createDeckFormSubscription) {
      this.createDeckFormSubscription.unsubscribe();
    }
    if (this.sourceLanguageSubscription) {
      this.sourceLanguageSubscription.unsubscribe();
    }
    if (this.targetLanguageSubscription) {
      this.targetLanguageSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.createDeckForm.valid) {
      this.isLoading = true;

      this.deckService
        .createDeck(
          this.createDeckForm.value.name!,
          this.createDeckForm.value.learningRate!,
          this.createDeckForm.value.sourceLanguage!,
          this.createDeckForm.value.targetLanguage!,
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

  getLanguageString(language: Language | null | undefined) {
    if (!language) {
      return null;
    }

    return this.languages.find((lang) => lang.value === language)?.viewValue;
  }

  getNameError() {
    const errorKey = Object.keys(this.createDeckForm.get('name')!.errors!)[0];
    return getNameErrorMessage(errorKey);
  }

  getSourceLanguageError() {
    const errorKey = Object.keys(
      this.createDeckForm.get('sourceLanguage')!.errors!,
    )[0];
    return getLanguageErrorMessage(errorKey);
  }

  getTargetLanguageError() {
    const errorKey = Object.keys(
      this.createDeckForm.get('targetLanguage')!.errors!,
    )[0];
    return getLanguageErrorMessage(errorKey);
  }

  setGeneralError(error: HttpErrorResponse) {
    if (typeof error.error.message === 'string') {
      this.generalErrorMessage = error.error.message;
    } else {
      this.generalErrorMessage = error.error.message[0];
    }
    this.createDeckForm.controls['name'].setErrors({ incorrect: true });
    this.createDeckForm.controls['learningRate'].setErrors({ incorrect: true });
    this.createDeckForm.controls['sourceLanguage'].setErrors({
      incorrect: true,
    });
    this.createDeckForm.controls['targetLanguage'].setErrors({
      incorrect: true,
    });
  }

  resetGeneralError() {
    this.generalErrorMessage = '';
    if (this.createDeckForm.get('name')?.errors?.['incorrect']) {
      this.createDeckForm.controls['name'].setErrors(null);
    }
    if (this.createDeckForm.get('learningRate')?.errors?.['incorrect']) {
      this.createDeckForm.controls['learningRate'].setErrors(null);
    }
    if (this.createDeckForm.get('sourceLanguage')?.errors?.['incorrect']) {
      this.createDeckForm.controls['sourceLanguage'].setErrors(null);
    }
    if (this.createDeckForm.get('targetLanguage')?.errors?.['incorrect']) {
      this.createDeckForm.controls['targetLanguage'].setErrors(null);
    }
  }
}
