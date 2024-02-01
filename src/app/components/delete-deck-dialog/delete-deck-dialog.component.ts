import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DeckService } from 'src/app/services/deck.service';
import { OverallDeckResponse } from 'src/app/models/response/overall-deck-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-deck-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './delete-deck-dialog.component.html',
  styleUrls: ['./delete-deck-dialog.component.css'],
})
export class DeleteDeckDialogComponent {
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { deck: OverallDeckResponse },
    private readonly dialogRef: MatDialogRef<DeleteDeckDialogComponent>,
    private readonly deckService: DeckService,
    private readonly snackBar: MatSnackBar,
  ) {}

  onDelete() {
    this.isLoading = true;
    this.deckService
      .deleteDeck(this.data.deck.id)
      .then(() => {
        this.deckService.triggerDecksReload();
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
