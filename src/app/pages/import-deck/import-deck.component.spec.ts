import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDeckComponent } from './import-deck.component';

describe('ImportDeckComponent', () => {
  let component: ImportDeckComponent;
  let fixture: ComponentFixture<ImportDeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImportDeckComponent],
    });
    fixture = TestBed.createComponent(ImportDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
