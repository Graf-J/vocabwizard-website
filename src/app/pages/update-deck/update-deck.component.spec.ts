import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeckComponent } from './update-deck.component';

describe('UpdateDeckComponent', () => {
  let component: UpdateDeckComponent;
  let fixture: ComponentFixture<UpdateDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateDeckComponent],
    });
    fixture = TestBed.createComponent(UpdateDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
