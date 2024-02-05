import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css'],
})
export class FlipCardComponent {
  toggleProperty = false;

  constructor() {}

  ngOnInit() {}

  flip() {
    this.toggleProperty = !this.toggleProperty;
  }
}
