import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WeatherParams } from '../types/WeatherParams';
import { Weather, Images, HourForecast, DayForecast } from '../types/Weather';
import { images } from "./data/images";
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
    console.log(utcOffsetSeconds)

    const current = response.current()!;
    const time = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);

    const hourly = response.hourly()!;
    const daily = response.daily()!;
    console.log(hourly.timeEnd())

    // const startHourly = moment(Number(hourly.time()) * 1000).add(utcOffsetSeconds, 'seconds');
    // const endHourly = moment(Number(hourly.timeEnd()) * 1000).add(utcOffsetSeconds, 'seconds');
    // const intervalHourly = moment.duration(hourly.interval(), 'seconds');

    // const timeHourly = [];
    // for (let time = startHourly.clone(); time.isBefore(endHourly); time.add(intervalHourly)) {
    //   timeHourly.push(time.toDate());
    // }
    // console.log(timeHourly)

    let parsed_response: any = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        precipitationProbability: hourly.variables(1)!.valuesArray()!,
        weatherCode: hourly.variables(2)!.valuesArray()!,
        windSpeed10m: hourly.variables(3)!.valuesArray()!,
        windDirection10m: hourly.variables(4)!.valuesArray()!,
        weatherIcon: []
      },

      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2m: daily.variables(1)!.valuesArray()!,
        temperature2d: daily.variables(2)!.valuesArray()!,
        precipitationProbability: daily.variables(3)!.valuesArray()!,
        weatherIcon: []

      }
    }

    console.log(parsed_response)

    parsed_response.hourly.weatherCode.forEach((element: number) => {
      parsed_response.hourly.weatherIcon.push(this.images[JSON.stringify(element)].day);
    });

    parsed_response.daily.weatherCode.forEach((element: number) => {
      parsed_response.daily.weatherIcon.push(this.images[JSON.stringify(element)].day);
    })


    const graphDateLabels: string[] = [];

    parsed_response.hourly.time.forEach((value: Date) => {
      graphDateLabels.push(moment(value).format("HH:mm"));
    })

    const temperatureData: any = {
      values:
        parsed_response.hourly.temperature2m,
      labels: graphDateLabels
    };

    const precipationChanceData: any = {
      values:
        parsed_response.hourly.precipitationProbability, labels: graphDateLabels
    };

    const windSpeedData: any = {
      values:
        parsed_response.hourly.windSpeed10m, labels: graphDateLabels
    };

    let dayForecast: DayForecast[] = [];
    for (let i = 0; i < parsed_response.daily.time.length; i++) {
      dayForecast.push({
        time: parsed_response.daily.time[i],
        temperature2m: Math.floor(parsed_response.daily.temperature2m[i]),
        temperature2d: Math.floor(parsed_response.daily.temperature2d[i]),
        precipitationProbability: Math.floor(parsed_response.daily.precipitationProbability[i]),
        weatherCode: parsed_response.daily.weatherCode[i],
        weatherIcon: parsed_response.daily.weatherIcon[i],
      })
    }

    let hourForecast: HourForecast[] = [];
    for (let i = 0; i < 49; i++) {

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

    hourForecast = hourForecast.filter((element: HourForecast) => {
      return moment(new Date()).isBefore(element.time);
    });

    hourForecast = hourForecast.slice(0, 24)


    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weather: Weather = {
      dateString: moment(time).format('DD.MM.YYYY HH:mm'),

      currentWeather: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: Math.floor(current.variables(0)!.value()),
        weatherIcon: this.images[JSON.stringify(current.variables(3)!.value())].day,
      },

      hourForecast: hourForecast,
      dayForecast: dayForecast,
      temperatureData: temperatureData,
      precipationChanceData: precipationChanceData,
      windSpeedData: windSpeedData
    };

    console.log(weather)
    return weather;
  }
}
