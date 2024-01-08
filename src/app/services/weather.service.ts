import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherParams } from '../types/WeatherParams';
import { Weather, Images, HourForecast, ImageData, DayForecast, CurrentWeather, GraphData } from '../types/Weather';
import { images } from "./data/images";
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  images: Images = images;

  constructor() { }

  public async getCurrentWeather(params: WeatherParams): Promise<Weather> {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const utcOffsetSeconds = responses[0].utcOffsetSeconds();
    const current = responses[0].current()!;
    const hourly = responses[0].hourly()!;
    const daily = responses[0].daily()!;

    // Helper function to generate a range of numbers. This function returns an array of all dates that are between 
    // the start and the end date based on the step. 
    // Example: range(1, 10, 2) returns [3, 5, 7, 9]
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process hourly and daily data
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const parsed_response: any = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray(),
        precipitationProbability: hourly.variables(1)!.valuesArray(),
        weatherCode: hourly.variables(2)!.valuesArray(),
        windSpeed10m: hourly.variables(3)!.valuesArray(),
        windDirection10m: hourly.variables(4)!.valuesArray(),
        weatherIcon: []
      },
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: daily.variables(0)!.valuesArray()!.map(Math.floor),
        temperature2m: daily.variables(1)!.valuesArray()!.map(Math.floor),
        temperature2d: daily.variables(2)!.valuesArray()!.map(Math.floor),
        precipitationProbability: daily.variables(3)!.valuesArray()!.map(Math.floor),
        weatherIcon: []
      }
    };

    // Process weather icons. We get the weather code and assign it the correct icon url.
    const processWeatherIcons = (sourceArray: number[], targetArray: ImageData[]) => {
      sourceArray.forEach((element: number) => {
        targetArray.push(this.images[JSON.stringify(element)].day);
      });
    };

    processWeatherIcons(parsed_response.hourly.weatherCode, parsed_response.hourly.weatherIcon);
    processWeatherIcons(parsed_response.daily.weatherCode, parsed_response.daily.weatherIcon);

    // Generate graph date labels made out of the hours and minutes
    const graphDateLabels: string[] = [];
    parsed_response.hourly.time.forEach((value: Date) => {
      graphDateLabels.push(moment(value).format("HH:mm"));
    });

    // Extract data for graphs
    const temperatureData: GraphData = {
      values: parsed_response.hourly.temperature2m.slice(0, 24),
      //We take just the first 24 values
      labels: graphDateLabels
    };

    const precipationChanceData: GraphData = {
      values: parsed_response.hourly.precipitationProbability.slice(0, 24),
      //We take just the first 24 values
      labels: graphDateLabels
    };

    const windSpeedData: GraphData = {
      values: parsed_response.hourly.windSpeed10m.slice(0, 24),
      //We take just the first 24 values
      labels: graphDateLabels
    };

    // Generate day forecast
    const dayForecast: DayForecast[] = [];
    for (let i = 0; i < parsed_response.daily.time.length; i++) {
      dayForecast.push({
        time: parsed_response.daily.time[i],
        temperature2m: parsed_response.daily.temperature2m[i],
        temperature2d: parsed_response.daily.temperature2d[i],
        precipitationProbability: parsed_response.daily.precipitationProbability[i],
        weatherCode: parsed_response.daily.weatherCode[i],
        weatherIcon: parsed_response.daily.weatherIcon[i],
      })
    }

    // Generate hour forecast
    const hourForecast: HourForecast[] = [];
    for (let i = 0; i < 24; i++) {

      hourForecast.push({
        id: i,
        time: parsed_response.hourly.time[i],
        temperature2m: Math.floor(parsed_response.hourly.temperature2m[i]),
        precipitationProbability: Math.floor(parsed_response.hourly.precipitationProbability[i]),
        weatherCode: parsed_response.hourly.weatherCode[i],
        windSpeed10m: Math.floor(parsed_response.hourly.windSpeed10m[i]),
        windDirection10m: parsed_response.hourly.windDirection10m[i],
        weatherIcon: parsed_response.hourly.weatherIcon[i],
      })
    }

    const currentWeather: CurrentWeather = {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: Math.floor(current.variables(0)!.value()),
      weatherIcon: this.images[JSON.stringify(current.variables(3)!.value())].day,
      // We get the weather code and assign it the correct icon url.
    };

    // Construct final weather object
    const weather: Weather = {
      dateString: moment(new Date()).format('DD.MM.YYYY HH:mm'),
      currentWeather: currentWeather,
      hourForecast,
      dayForecast,
      temperatureData,
      precipationChanceData,
      windSpeedData
    };

    return weather;
  }
}
