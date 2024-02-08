import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCardDialogComponent } from './delete-card-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';

describe('DeleteCardDialogComponent', () => {
  let component: DeleteCardDialogComponent;
  let fixture: ComponentFixture<DeleteCardDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteCardDialogComponent,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { card: {} },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
        UserService,
        MatSnackBar,
      ],
    });
    fixture = TestBed.createComponent(DeleteCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
