import { Component, Input, OnInit } from '@angular/core';
import { DayForecast } from '../../types/Weather';
import moment from 'moment';

@Component({
  selector: 'app-day-forecast-card',
  standalone: true,
  imports: [],
  templateUrl: './day-forecast-card.component.html',
  styleUrl: './day-forecast-card.component.css'
})
export class DayForecastCardComponent implements OnInit {

  @Input() dayForecast!: DayForecast;

  date: string = ""
  time: string = ""

  constructor() { }

  ngOnInit(): void {
    this.date = moment(this.dayForecast.time).format("dddd - DD.MM.yyyy");
  }
}
