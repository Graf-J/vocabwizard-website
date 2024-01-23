import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard, authPreventionGuard } from './services/guards/auth.guard';
import { DeckOverviewComponent } from './pages/deck-overview/deck-overview.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
