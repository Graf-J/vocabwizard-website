import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading: boolean = false;
  generalErrorMessage: string = '';

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.generalErrorMessage = '';
      if (this.loginForm.get('name')?.errors?.['incorrect']) {
        this.loginForm.controls['name'].setErrors(null);
      }
      if (this.loginForm.get('password')?.errors?.['incorrect']) {
        this.loginForm.controls['password'].setErrors(null);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Request');
      this.isLoading = true;

      this.authService
        .login(this.loginForm.value.name!, this.loginForm.value.password!)
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

  private setGeneralError(error: HttpErrorResponse) {
    this.generalErrorMessage = error.error.message;
    this.loginForm.controls['name'].setErrors({ incorrect: true });
    this.loginForm.controls['password'].setErrors({ incorrect: true });
  }
}
