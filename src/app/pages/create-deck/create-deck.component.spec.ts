import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeckComponent } from './create-deck.component';

describe('CreateDeckComponent', () => {
  let component: CreateDeckComponent;
  let fixture: ComponentFixture<CreateDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateDeckComponent],
    });
    fixture = TestBed.createComponent(CreateDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
