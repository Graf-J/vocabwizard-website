import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagePlotComponent } from 'src/app/components/stage-plot/stage-plot.component';
import { DeckService } from 'src/app/services/deck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Stat } from 'src/app/models/response/stat.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    StagePlotComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  isLoading: boolean = true;
  stats: Stat[] | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly deckService: DeckService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const deckId = params['deckId'];
      this.fetchStats(deckId);
    });
  }

  fetchStats(deckId: string) {
    this.deckService
      .stats(deckId)
      .then((res: Stat[]) => {
        this.stats = res;
      })
      .catch((error: HttpErrorResponse) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 5 * 1000,
          data: { message: error.error.message },
        });

        this.router.navigate(['']);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
