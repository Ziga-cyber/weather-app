import { Component, Input } from '@angular/core';
import { Weather } from '../../types/Weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-weather-card',
  standalone: true,
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.css',
  imports: [CommonModule]
})
export class CurrentWeatherCardComponent {
  @Input() place: string = "";
  @Input() weather!: Weather;

  constructor() { }



}
