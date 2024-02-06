import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Stat } from 'src/app/models/response/stat.model';

@Component({
  selector: 'app-stage-plot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage-plot.component.html',
  styleUrls: ['./stage-plot.component.css'],
})
export class StagePlotComponent implements OnInit {
  private readonly colors: string[] = [
    '#a6a4a4',
    '#f54242',
    '#f56f42',
    '#f59c42',
    '#f5c942',
    '#f5f542',
    '#c8f542',
    '#9cf542',
    '#26c962',
  ];
  private readonly labels: string[] = [
    'Not Learned',
    'Very Bad',
    'Bad',
    'Fair',
    'Mediocre',
    'Okay',
    'Very Good',
    'Excellent',
    'Amazing',
  ];
  chart: any;

  @Input() stats!: Stat[];

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.getImputedData(),
            backgroundColor: this.colors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }

  getImputedData() {
    const result: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.stats.forEach((stat: Stat) => {
      result[stat.stage] = stat.count;
    });

    return result;
  }
}
