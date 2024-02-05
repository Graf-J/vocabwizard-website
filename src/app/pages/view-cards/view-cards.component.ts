import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoResponse } from 'src/app/models/response/card-info-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { VocabCardComponent } from 'src/app/components/vocab-card/vocab-card.component';
import { FrontCard } from 'src/app/models/front-card.model';
import { BackCard } from 'src/app/models/back-card.model';
import { CardShareService } from 'src/app/card-share.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteCardDialogComponent } from 'src/app/components/delete-card-dialog/delete-card-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDialogModule,
    VocabCardComponent,
  ],
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css'],
})
export class ViewCardsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'word',
    'stage',
    'createdAt',
    'expires',
    'view',
    'delete',
  ];
  deckId!: string;
  dataSource!: MatTableDataSource<CardInfoResponse>;
  isLoading: boolean = true;
  isEmpty: boolean = true;

  frontCardData: FrontCard | undefined;
  backCardData: BackCard | undefined;

  private cardsReloadSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cardService: CardService,
    private readonly cardShareService: CardShareService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly _liveAnnouncer: LiveAnnouncer,
  ) {
    this.cardsReloadSubscription = this.cardService.reloadCards$.subscribe(
      () => {
        this.fetchCards(this.deckId);
      },
    );
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(VocabCardComponent) cardComponent!: VocabCardComponent;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.deckId = params['deckId'];
      this.fetchCards(this.deckId);
    });
  }

  ngOnDestroy(): void {
    this.cardsReloadSubscription.unsubscribe();
  }

  fetchCards(deckId: string) {
    this.cardService
      .getCards(deckId)
      .then((res: CardInfoResponse[]) => {
        this.isEmpty = res.length === 0;
        // Defer execution to make sorting work
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        }, 0);
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onVisibilityClick(card: CardInfoResponse) {
    this.frontCardData = {
      word: card.word,
    };
    this.backCardData = {
      translation: card.translation,
      audioLink: card.audioLink,
      phonetic: card.phonetic,
      definitions: card.definitions,
      examples: card.examples,
      synonyms: card.synonyms,
      antonyms: card.antonyms,
    };

    if (window.innerWidth < 1200) {
      this.cardShareService.setData(card);
      this.router.navigate(['card', this.deckId]);
    }
  }

  onFlipClick() {
    this.cardComponent.flip();
  }

  onDeleteClick(card: CardInfoResponse) {
    this.dialog.open(DeleteCardDialogComponent, {
      data: {
        deckId: this.deckId,
        card: card,
      },
    });
  }
}
