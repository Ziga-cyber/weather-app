import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { CurrentWeatherCardComponent } from './components/current-weather-card.component';
import { WeatherService } from './services/weather.service';
import { WeatherParams } from './types/WeatherParams';
import { Weather, HourForecast } from './types/Weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, CurrentWeatherCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  place: string;
  hourlyParams: WeatherParams;
  weatherSevice: WeatherService;
  weather: Weather | null;
  hourForecast: HourForecast[] | null;

  constructor() {
    this.place = "Maribor";
    this.hourlyParams = {
      latitude: 46.5547,
      longitude: 15.6459,
      current: ["temperature_2m", "relative_humidity_2m", "precipitation", "weather_code", "wind_speed_10m", "wind_direction_10m"],
      hourly: ["temperature_2m", "precipitation_probability", "precipitation", "weather_code", "wind_speed_10m", "wind_direction_10m"],
      daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "wind_speed_10m_max", "wind_direction_10m_dominant"],
      timezone: "Europe/Ljubljana"
    };
    this.weatherSevice = new WeatherService();
    this.weather = null;
    this.hourForecast = null;
  }

  async ngOnInit() {
    this.weather = await this.weatherSevice.getCurrentWeather(this.hourlyParams);
  }
}
