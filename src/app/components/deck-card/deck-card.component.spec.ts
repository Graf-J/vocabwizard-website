import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCardComponent } from './deck-card.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeckService } from 'src/app/services/deck.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OverallDeckResponse } from 'src/app/models/response/overall-deck-response.model';

describe('DeckCardComponent', () => {
  let component: DeckCardComponent;
  let fixture: ComponentFixture<DeckCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeckCardComponent,
        CommonModule,
        RouterModule,
        ClipboardModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [
        DeckService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
      ],
    });
    fixture = TestBed.createComponent(DeckCardComponent);
    component = fixture.componentInstance;
    component.deck = {
      id: '123',
      name: 'name',
    } as OverallDeckResponse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
