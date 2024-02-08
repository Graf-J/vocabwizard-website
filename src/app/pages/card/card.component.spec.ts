import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { VocabCardComponent } from 'src/app/components/vocab-card/vocab-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CardShareService } from 'src/app/card-share.service';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent, VocabCardComponent, MatButtonModule],
      providers: [
        Router,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
        CardShareService,
      ],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
