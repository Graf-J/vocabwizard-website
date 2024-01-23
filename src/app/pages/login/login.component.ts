import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
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
export class LoginComponent {
  hide = true;
  isLoading: boolean = false;
  loginError: boolean = false;
  loginErrorMessage: string = '';

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginErrorMessage = '';

      this.authService
        .login(this.loginForm.value.name!, this.loginForm.value.password!)
        .then((res) => {
          this.authService.setToken(res.AccessToken);
          this.router.navigate(['']);
        })
        .catch((error: HttpErrorResponse) => {
          this.loginErrorMessage = error.error.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
