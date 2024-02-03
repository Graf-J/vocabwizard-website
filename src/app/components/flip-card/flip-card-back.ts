import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'flip-card-back',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./flip-card.component.css'],
})
export class FlipCardBackComponent {}
