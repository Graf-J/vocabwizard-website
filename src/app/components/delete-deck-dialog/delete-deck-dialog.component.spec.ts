import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeckDialogComponent } from './delete-deck-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';

describe('DeleteDeckDialogComponent', () => {
  let component: DeleteDeckDialogComponent;
  let fixture: ComponentFixture<DeleteDeckDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DeleteDeckDialogComponent,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { deck: {} },
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
    fixture = TestBed.createComponent(DeleteDeckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
