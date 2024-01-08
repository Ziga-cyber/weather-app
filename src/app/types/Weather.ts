export type Weather = {
    currentWeather: CurrentWeather,
    hourForecast: HourForecast[],
    dayForecast: DayForecast[],
    dateString: string,
    temperatureData: GraphData,
    precipationChanceData: GraphData
    windSpeedData: GraphData
}

export type GraphData = {
    values: number[],
    labels: string[]
}

export type CurrentWeather = {
    time: Date;
    temperature2m: number;
    weatherIcon: ImageData;
}

export type ImageData = {
    description: string,
    image: string
}

export interface Images {
    [key: string]: {
        day: ImageData;
        night: ImageData;
    };
}

export type HourlyWeather = {
    time: Date,
    temperature2m: number[],
    precipitationProbability: number[],
    precipitation: number[],
    weatherCode: string[],
    windSpeed10m: number[],
    windDirection10m: number[],
    weatherIcon: Images[]
}

export type HourForecast = {
    time: Date,
    temperature2m: number,
    precipitationProbability: number,
    weatherCode: string,
    windSpeed10m: number,
    windDirection10m: number,
    weatherIcon: Images,
    id: number
}

export type DayForecast = {
    time: Date
    temperature2m: number,
    precipitationProbability: number,
    weatherCode: string,
    temperature2d: number,
    weatherIcon: Images,
}