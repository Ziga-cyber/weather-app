import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import moment from "moment";
import { GraphData } from '../types/Weather';

@Component({
  selector: 'app-temeprature-chart',
  standalone: true,
  imports: [],
  templateUrl: './temeprature-chart.component.html',
  styleUrl: './temeprature-chart.component.css'
})

export class TemepratureChartComponent implements OnInit {

  @Input() graphData!: GraphData;

  times: string[] = [];
  chart: any = [];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {


    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: this.graphData.labels.slice(0, 24),
        datasets: [
          {
            label: 'Temperatures (°C) in the next 24 hours',
            data: this.graphData.values.slice(0, 24),
            borderWidth: 4,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      },


    });
  }

}
