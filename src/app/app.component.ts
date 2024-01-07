import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrentWeatherCardComponent } from './components/current-weather-card/current-weather-card.component';
import { WeatherService } from './services/weather.service';
import { WeatherParams } from './types/WeatherParams';
import { Weather, HourForecast, GraphData } from './types/Weather';
import { HoursForecastCardComponent } from './components/hours-forecast-card/hours-forecast-card.component';
import { DayForecastCardComponent } from './components/day-forecast-card/day-forecast-card.component';
import { ChartComponent } from "./components/chart/chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, NavbarComponent, CurrentWeatherCardComponent, DayForecastCardComponent, ChartComponent, HoursForecastCardComponent]
})

export class AppComponent implements OnInit {
  place: string;
  hourlyParams: WeatherParams;
  weatherSevice: WeatherService;
  weather: Weather | null;
  hourForecast: HourForecast[] | null;
  graphsData: GraphData | null;
  graphTitle: string;
  graphColor: string;


  constructor() {
    this.place = "Maribor";
    this.hourlyParams = {
      latitude: 46.5547,
      longitude: 15.6459,
      current: ["temperature_2m", "relative_humidity_2m", "precipitation", "weather_code", "wind_speed_10m", "wind_direction_10m"],
      hourly: ["temperature_2m", "precipitation_probability", "weather_code", "wind_speed_10m", "wind_direction_10m"],
      daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "temperature_2m_max"],
      timezone: "auto",
      forecast_days: 10
    };
    this.weatherSevice = new WeatherService();
    this.weather = null;
    this.hourForecast = null;
    this.graphsData = null;
    this.graphTitle = "Temperatures (°C) in the next 24 hours";
    this.graphColor = "#007BFF"
  }

  async ngOnInit() {
    this.weather = await this.weatherSevice.getCurrentWeather(this.hourlyParams);
    this.graphsData = this.weather.temperatureData;
  }

  public setTemperatureGraph(): void {
    this.graphTitle = "Temperatures (°C) in the next 24 hours"
    this.graphsData = this.weather!.temperatureData;
    this.graphColor = "#007BFF"
  }

  public setWindGraph(): void {
    this.graphTitle = "Wind speed (m/s) in the next 24 hours"
    this.graphsData = this.weather!.windSpeedData;
    this.graphColor = "#DC3545";
  }

  public setPrecepationGraph(): void {
    this.graphTitle = "Precepation chance (%) in the next 24 hours"
    this.graphsData = this.weather!.precipationChanceData;
    this.graphColor = "#28A745";

  }
}
