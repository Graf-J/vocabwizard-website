import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() showHeader: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  navigateHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['login']);
  }
}
