import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { Weather, GraphData } from './types/Weather';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrentWeatherCardComponent } from './components/current-weather-card/current-weather-card.component';
import { HoursForecastCardComponent } from './components/hours-forecast-card/hours-forecast-card.component';
import { DayForecastCardComponent } from './components/day-forecast-card/day-forecast-card.component';
import { ChartComponent } from './components/chart/chart.component';
import { WeatherParams } from './types/WeatherParams';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, NavbarComponent, CurrentWeatherCardComponent, DayForecastCardComponent, ChartComponent, HoursForecastCardComponent],
})
export class AppComponent implements OnInit {
  place = 'Maribor';
  hourlyParams: WeatherParams = {
    latitude: 46.5547,
    longitude: 15.6459,
    current: ['temperature_2m', 'relative_humidity_2m', 'precipitation', 'weather_code', 'wind_speed_10m', 'wind_direction_10m'],
    hourly: ['temperature_2m', 'precipitation_probability', 'weather_code', 'wind_speed_10m', 'wind_direction_10m'],
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'temperature_2m_max'],
    timezone: 'auto',
    forecast_days: 10,
    forecast_hours: 24
  };
  weather: Weather | null = null;
  graphsData: GraphData | null = null;
  graphTitle = 'Temperatures (°C) in the next 24 hours';
  graphColor = '#007BFF';

  constructor(private weatherService: WeatherService) { }

  async ngOnInit() {
    try {
      this.weather = await this.weatherService.getCurrentWeather(this.hourlyParams);
      this.graphsData = this.weather.temperatureData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  setTemperatureGraph(): void {
    this.graphTitle = 'Temperatures (°C) in the next 24 hours';
    this.graphsData = this.weather!.temperatureData;
    this.graphColor = '#007BFF';
  }

  setWindGraph(): void {
    this.graphTitle = 'Wind speed (m/s) in the next 24 hours';
    this.graphsData = this.weather!.windSpeedData;
    this.graphColor = '#DC3545';
  }

  setPrecipitationGraph(): void {
    this.graphTitle = 'Precipitation chance (%) in the next 24 hours';
    this.graphsData = this.weather!.precipationChanceData;
    this.graphColor = '#28A745';
  }
}
