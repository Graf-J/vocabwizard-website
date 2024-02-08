import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCardsComponent } from './view-cards.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { VocabCardComponent } from 'src/app/components/vocab-card/vocab-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewCardsComponent', () => {
  let component: ViewCardsComponent;
  let fixture: ComponentFixture<ViewCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ViewCardsComponent,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatDialogModule,
        VocabCardComponent,
        HttpClientTestingModule,
      ],
      providers: [
        CardService,
        Router,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
      ],
    });
    fixture = TestBed.createComponent(ViewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
