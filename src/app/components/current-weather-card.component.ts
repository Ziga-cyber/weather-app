import { Component, Input } from '@angular/core';
import { HourForecast, Weather } from '../types/Weather';
import { TemepratureChartComponent } from './temeprature-chart.component';
import { CommonModule } from '@angular/common';
import { HoursForecastCardComponent } from "./hours-forecast-card.component";

@Component({
  selector: 'app-current-weather-card',
  standalone: true,
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.css',
  imports: [TemepratureChartComponent, CommonModule, HoursForecastCardComponent]
})
export class CurrentWeatherCardComponent {
  @Input() place: string = "";
  @Input() weather!: Weather;

  constructor() { }



}
