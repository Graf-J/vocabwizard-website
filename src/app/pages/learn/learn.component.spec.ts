import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnComponent } from './learn.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { FlipCardFrontComponent } from 'src/app/components/flip-card/flip-card-front';
import { FlipCardBackComponent } from 'src/app/components/flip-card/flip-card-back';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { VocabCardComponent } from 'src/app/components/vocab-card/vocab-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LearnComponent', () => {
  let component: LearnComponent;
  let fixture: ComponentFixture<LearnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LearnComponent,
        FlipCardComponent,
        FlipCardFrontComponent,
        FlipCardBackComponent,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        VocabCardComponent,
        HttpClientTestingModule,
      ],
      providers: [
        Router,
        CardService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
        MatSnackBar,
      ],
    });
    fixture = TestBed.createComponent(LearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
