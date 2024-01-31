import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverallDeckResponse } from 'src/app/models/response/overall-deck-response.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDeckDialogComponent } from '../delete-deck-dialog/delete-deck-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css'],
})
export class DeckCardComponent {
  @Input({ required: true }) deck!: OverallDeckResponse;

  constructor(private readonly dialog: MatDialog) {}

  openDeleteDeckDialog() {
    this.dialog.open(DeleteDeckDialogComponent, {
      data: {
        deck: this.deck,
      },
    });
  }
}
