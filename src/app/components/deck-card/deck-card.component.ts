import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { OverallDeckResponse } from 'src/app/models/response/overall-deck-response.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDeckDialogComponent } from '../delete-deck-dialog/delete-deck-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-deck-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css'],
})
export class DeckCardComponent {
  @Input({ required: true }) deck!: OverallDeckResponse;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  onCopyDeckId() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3 * 1000,
      data: { message: 'Copied to Clipboard' },
    });
  }

  openDeleteDeckDialog() {
    this.dialog.open(DeleteDeckDialogComponent, {
      data: {
        deck: this.deck,
      },
    });
  }
}
