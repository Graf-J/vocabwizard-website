import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vocabwizard-client';
  showHeader: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log(this.isLoginOrRegisterRoute());
        this.showHeader = !this.isLoginOrRegisterRoute();
      });
  }

  private isLoginOrRegisterRoute(): boolean {
    // Check if the current route is login or register
    return (
      this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'login' ||
      this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'register'
    );
  }
}
