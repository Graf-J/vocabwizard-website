import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagePlotComponent } from './stage-plot.component';

describe('StagePlotComponent', () => {
  let component: StagePlotComponent;
  let fixture: ComponentFixture<StagePlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StagePlotComponent],
    });
    fixture = TestBed.createComponent(StagePlotComponent);
    component = fixture.componentInstance;
    component.stats = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
