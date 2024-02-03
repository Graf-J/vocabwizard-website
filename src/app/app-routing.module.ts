import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/guards/auth.guard';
import { authPreventionGuard } from './services/guards/auth-prevention.guard';
import { DeckOverviewComponent } from './pages/deck-overview/deck-overview.component';
import { RegisterComponent } from './pages/register/register.component';
import { LearnComponent } from './pages/learn/learn.component';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';
import { ImportDeckComponent } from './pages/import-deck/import-deck.component';
import { UserComponent } from './pages/user/user.component';
import { adminGuard } from './services/guards/admin.guard';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { UpdateDeckComponent } from './pages/update-deck/update-deck.component';

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
  {
    path: 'add-card/:deckId',
    component: AddCardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create-deck',
    component: CreateDeckComponent,
    canActivate: [authGuard],
  },
  {
    path: 'import-deck',
    component: ImportDeckComponent,
    canActivate: [authGuard],
  },
  {
    path: 'update-deck/:deckId',
    component: UpdateDeckComponent,
    canActivate: [authGuard],
  },
  {
    path: 'learn/:deckId',
    component: LearnComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
