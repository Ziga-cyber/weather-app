import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GraphData } from '../../types/Weather';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnChanges {

  @Input() graphData!: GraphData;
  @Input() graphTitle!: string;
  @Input() color!: string;

  chart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] && this.chart) {
      this.updateChartData();
    } else if (changes['graphData'] && !this.chart) {
      this.createChart();
    }
  }

  private createChart(): void {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: this.graphData.labels.slice(0, 24),
        datasets: [
          {
            label: this.graphTitle,
            borderColor: this.color,
            data: this.graphData.values.slice(0, 24),
            borderWidth: 4,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }

  private updateChartData(): void {
    if (this.chart) {
      this.chart.data.labels = this.graphData.labels;
      this.chart.data.datasets[0].data = this.graphData.values;
      this.chart.data.datasets[0].label = this.graphTitle;
      this.chart.data.datasets[0].borderColor = this.color;
      this.chart.update();
    }
  }
}
