import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlipCardComponent } from '../flip-card/flip-card.component';
import { FlipCardFrontComponent } from '../flip-card/flip-card-front';
import { FlipCardBackComponent } from '../flip-card/flip-card-back';
import { FrontCard } from 'src/app/models/front-card.model';
import { BackCard } from 'src/app/models/back-card.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vocab-card',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    FlipCardComponent,
    FlipCardFrontComponent,
    FlipCardBackComponent,
  ],
  templateUrl: './vocab-card.component.html',
  styleUrls: ['./vocab-card.component.css'],
})
export class VocabCardComponent {
  @Input() frontCardData!: FrontCard | undefined;
  @Input() backCardData!: BackCard | undefined;

  @ViewChild(FlipCardComponent) cardComponent!: FlipCardComponent;

  playAudio() {
    if (this.backCardData) {
      const audio = new Audio(this.backCardData.audioLink!);
      audio.play();
    }
  }

  flip() {
    this.cardComponent.flip();
  }
}
