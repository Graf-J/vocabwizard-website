import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/guards/auth.guard';
import { authPreventionGuard } from './services/guards/auth-prevention.guard';
import { DeckOverviewComponent } from './pages/deck-overview/deck-overview.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authPreventionGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authPreventionGuard],
  },
  {
    path: '',
    component: DeckOverviewComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
