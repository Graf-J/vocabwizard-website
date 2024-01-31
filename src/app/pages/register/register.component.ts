import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from 'src/app/services/validators/password-match.validator';
import {
  getNameErrorMessage,
  getPasswordErrorMessage,
  getPasswordConfirmationErrorMessage,
} from 'src/app/utils/error-parser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hidePassword = true;
  hidePasswordConfirmation = true;
  isLoading: boolean = false;
  generalErrorMessage: string = '';

  registerFormSubscription: Subscription | undefined;
  passwordSubscription: Subscription | undefined;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(
        /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[\w!@#$%^&*(),.?":{}|<>]+$/,
      ),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      passwordMatchValidator,
    ]),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Handle reset of Errors in General Error
    this.registerFormSubscription = this.registerForm.valueChanges.subscribe(
      () => {
        this.resetGeneralError();
      },
    );

    // Update Validity of passwordConfirmation on Password-Change
    this.passwordSubscription = this.registerForm
      .get('password')
      ?.valueChanges.subscribe(() => {
        this.registerForm.get('passwordConfirmation')?.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    if (this.registerFormSubscription) {
      this.registerFormSubscription.unsubscribe();
    }
    if (this.passwordSubscription) {
      this.passwordSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      this.authService
        .register(
          this.registerForm.value.name!,
          this.registerForm.value.password!,
          this.registerForm.value.passwordConfirmation!,
        )
        .then((res) => {
          this.authService.setToken(res.AccessToken);
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
    const errorKey = Object.keys(this.registerForm.get('name')!.errors!)[0];
    return getNameErrorMessage(errorKey);
  }

  getPasswordError() {
    const errorKey = Object.keys(this.registerForm.get('password')!.errors!)[0];
    return getPasswordErrorMessage(errorKey);
  }

  getPasswordConfirmationError() {
    const errorKey = Object.keys(
      this.registerForm.get('passwordConfirmation')!.errors!,
    )[0];
    return getPasswordConfirmationErrorMessage(errorKey);
  }

  private setGeneralError(error: HttpErrorResponse) {
    if (typeof error.error.message === 'string') {
      this.generalErrorMessage = error.error.message;
    } else {
      this.generalErrorMessage = error.error.message[0];
    }
    this.registerForm.controls['name'].setErrors({ incorrect: true });
    this.registerForm.controls['password'].setErrors({ incorrect: true });
    this.registerForm.controls['passwordConfirmation'].setErrors({
      incorrect: true,
    });
  }

  private resetGeneralError() {
    this.generalErrorMessage = '';
    if (this.registerForm.get('name')?.errors?.['incorrect']) {
      this.registerForm.controls['name'].setErrors(null);
    }
    if (this.registerForm.get('password')?.errors?.['incorrect']) {
      this.registerForm.controls['password'].setErrors(null);
    }
    if (this.registerForm.get('passwordConfirmation')?.errors?.['incorrect']) {
      this.registerForm.controls['passwordConfirmation'].setErrors(null);
    }
  }
}
