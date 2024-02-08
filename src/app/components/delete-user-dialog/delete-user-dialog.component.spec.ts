import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDialogComponent } from './delete-user-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteUserDialogComponent,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { user: {} },
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
    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
