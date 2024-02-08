import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SnackbarComponent, MatButtonModule, MatSnackBarModule],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {} as MatSnackBarRef<SnackbarComponent>,
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message: 'Test Message' },
        },
      ],
    });
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
