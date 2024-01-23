import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckOverviewComponent } from './deck-overview.component';

describe('DeckOverviewComponent', () => {
  let component: DeckOverviewComponent;
  let fixture: ComponentFixture<DeckOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeckOverviewComponent]
    });
    fixture = TestBed.createComponent(DeckOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
