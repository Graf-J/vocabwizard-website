import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeckService } from '../../services/deck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StatisticsComponent,
        CommonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      providers: [
        DeckService,
        Router,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ deckId: '123' }) },
        },
      ],
    });
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
