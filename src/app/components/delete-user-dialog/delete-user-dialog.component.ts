import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserResponse } from 'src/app/models/response/user-response.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css'],
})
export class DeleteUserDialogComponent {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { user: UserResponse },
    private readonly dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
  ) {}

  onDelete() {
    this.isLoading = true;
    this.userService
      .deleteUser(this.data.user.id)
      .then(() => {
        this.userService.triggerUsersReload();
        this.dialogRef.close();
      })
      .catch((error: HttpErrorResponse) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
          data: { message: error.error.message },
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
