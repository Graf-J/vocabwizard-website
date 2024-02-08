import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckOverviewComponent } from './deck-overview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeckCardComponent } from 'src/app/components/deck-card/deck-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeckService } from 'src/app/services/deck.service';

describe('DeckOverviewComponent', () => {
  let component: DeckOverviewComponent;
  let fixture: ComponentFixture<DeckOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeckOverviewComponent,
        MatProgressSpinnerModule,
        DeckCardComponent,
        MatIconModule,
        MatButtonModule,
        HttpClientTestingModule,
      ],
      providers: [DeckService],
    });
    fixture = TestBed.createComponent(DeckOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
