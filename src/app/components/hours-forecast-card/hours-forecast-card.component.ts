import { Component, Input, OnInit } from '@angular/core';
import { HourForecast } from '../../types/Weather';
import moment from 'moment';

@Component({
  selector: 'app-hours-forecast-card',
  standalone: true,
  imports: [],
  templateUrl: './hours-forecast-card.component.html',
  styleUrl: './hours-forecast-card.component.css'
})
export class HoursForecastCardComponent implements OnInit {
  @Input() hourForecast!: HourForecast;

  time: string

  constructor() {
    this.time = "";
  }

  ngOnInit(): void {
    this.time = moment(this.hourForecast.time).format("dddd") + " at " + moment(this.hourForecast.time).format("HH:mm");
  }

  /*
   * Converts a wind direction in degrees to a textual representation of the cardinal and intercardinal directions.
   * Each 22.5 degrees corresponds to one of the 16 cardinal and intercardinal directions.
   * degrees => The wind direction in degrees (range: 0 to 360).
   */
  public getWindDirectionText(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

    // Calculate the index in the directions array.
    const index = Math.floor(degrees / 22.5) % 16;
    return directions[index];
  }



}
