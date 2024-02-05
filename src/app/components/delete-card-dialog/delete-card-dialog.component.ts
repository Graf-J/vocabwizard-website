import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CardInfoResponse } from 'src/app/models/response/card-info-response.model';
import { CardService } from 'src/app/services/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-delete-card-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './delete-card-dialog.component.html',
  styleUrls: ['./delete-card-dialog.component.css'],
})
export class DeleteCardDialogComponent {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { deckId: string; card: CardInfoResponse },
    private readonly dialogRef: MatDialogRef<DeleteCardDialogComponent>,
    private readonly cardService: CardService,
    private readonly snackBar: MatSnackBar,
  ) {}

  onDelete() {
    this.isLoading = true;
    this.cardService
      .deleteCard(this.data.deckId, this.data.card.id)
      .then(() => {
        this.cardService.triggerCardsReload();
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
