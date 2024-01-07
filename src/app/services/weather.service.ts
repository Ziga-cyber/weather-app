import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherParams } from '../types/WeatherParams';
import { Weather, Images, HourForecast } from '../types/Weather';
import { images } from "../types/data/images";
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  images: Images;

  constructor() {
    this.images = images;
  }

  public async getCurrentWeather(params: WeatherParams): Promise<Weather> {
    const url = "https://api.open-meteo.com/v1/forecast";

    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location.
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;
    const time = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);

    const hourly = response.hourly()!;
    const daily = response.daily()!;

    let parsed_response: any = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        precipitationProbability: hourly.variables(1)!.valuesArray()!,
        precipitation: hourly.variables(2)!.valuesArray()!,
        weatherCode: hourly.variables(3)!.valuesArray()!,
        windSpeed10m: hourly.variables(4)!.valuesArray()!,
        windDirection10m: hourly.variables(5)!.valuesArray()!,
        weatherIcon: []
      }
    }

    parsed_response.hourly.weatherCode.forEach((element: number) => {
      parsed_response.hourly.weatherIcon.push(this.images[JSON.stringify(element)].day);
    });

    const labels: string[] = [];

    parsed_response.hourly.time.forEach((value: Date) => {
      labels.push(moment(value).format("HH:mm"));
    })

    const temperatureData: any = {
      values:
        parsed_response.hourly.temperature2m,
      labels: labels
    };

    console.log(parsed_response)
    const precipationChanceData: any = {
      values:
        parsed_response.hourly.precipitationProbability, labels: labels
    };

    const windSpeedData: any = {
      values:
        parsed_response.hourly.windSpeed10m, labels: labels
    };

    let hourForecast: HourForecast[] = [];
    for (let i = 0; i < parsed_response.hourly.time.length; i++) {
      hourForecast.push({
        time: parsed_response.hourly.time[i],
        temperature2m: Math.floor(parsed_response.hourly.temperature2m[i]),
        precipitationProbability: Math.floor(parsed_response.hourly.precipitationProbability[i]),
        precipitation: Math.floor(parsed_response.hourly.precipitation[i]),
        weatherCode: parsed_response.hourly.weatherCode[i],
        windSpeed10m: Math.floor(parsed_response.hourly.windSpeed10m[i]),
        windDirection10m: parsed_response.hourly.windDirection10m[i],
        weatherIcon: parsed_response.hourly.weatherIcon[i],
      })
    }

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weather: Weather = {
      day: moment(time).format('dddd'),
      dateString: moment(time).format('DD.MM.YYYY HH:mm'),

      currentWeather: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: Math.floor(current.variables(0)!.value()),
        weatherIcon: this.images[JSON.stringify(current.variables(3)!.value())].day,
      },

      hourForecast: hourForecast,
      daily: undefined,
      temperatureData: temperatureData,
      precipationChanceData: precipationChanceData,
      windSpeedData: windSpeedData
    };

    // // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // for (let i = 0; i < weatherData.hourly.time.length; i++) {
    //   console.log(
    //     weatherData.hourly.time[i].toISOString(),
    //     weatherData.hourly.temperature2m[i],
    //     weatherData.hourly.precipitationProbability[i],
    //     weatherData.hourly.precipitation[i],
    //     weatherData.hourly.weatherCode[i],
    //     weatherData.hourly.windSpeed10m[i],
    //     weatherData.hourly.windDirection10m[i]
    //   );
    // }
    // for (let i = 0; i < weatherData.daily.time.length; i++) {
    //   console.log(
    //     weatherData.daily.time[i].toISOString(),
    //     weatherData.daily.weatherCode[i],
    //     weatherData.daily.temperature2mMax[i],
    //     weatherData.daily.temperature2mMin[i],
    //     weatherData.daily.sunset[i],
    //     weatherData.daily.uvIndexMax[i],
    //     weatherData.daily.precipitationSum[i],
    //     weatherData.daily.rainSum[i],
    //     weatherData.daily.showersSum[i],
    //     weatherData.daily.snowfallSum[i],
    //     weatherData.daily.windSpeed10mMax[i],
    //     weatherData.daily.windDirection10mDominant[i]
    //   );
    // }


    console.log(weather)
    return weather;
  }
}
