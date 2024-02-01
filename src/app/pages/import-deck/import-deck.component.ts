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
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { DeckService } from 'src/app/services/deck.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getIdErrorMessage } from 'src/app/utils/error-parser';

@Component({
  selector: 'app-import-deck',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './import-deck.component.html',
  styleUrls: ['./import-deck.component.css'],
})
export class ImportDeckComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  generalErrorMessage: string = '';

  importFormSubscription: Subscription | undefined;

  importForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly deckService: DeckService,
  ) {}

  ngOnInit(): void {
    this.importFormSubscription = this.importForm.valueChanges.subscribe(() => {
      this.resetGeneralError();
    });
  }

  ngOnDestroy(): void {
    if (this.importFormSubscription) {
      this.importFormSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.importForm.valid) {
      this.isLoading = true;

      this.deckService
        .import(this.importForm.value.id!)
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

  getIdError() {
    const errorKey = Object.keys(this.importForm.get('id')!.errors!)[0];
    return getIdErrorMessage(errorKey);
  }

  private setGeneralError(error: HttpErrorResponse) {
    this.generalErrorMessage = error.error.message;
    this.importForm.controls['id'].setErrors({ incorrect: true });
  }

  private resetGeneralError() {
    this.generalErrorMessage = '';
    if (this.importForm.get('id')?.errors?.['incorrect']) {
      this.importForm.controls['id'].setErrors(null);
    }
  }
}
