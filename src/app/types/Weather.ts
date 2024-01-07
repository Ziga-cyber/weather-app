export interface Weather {
    currentWeather: CurrentWeather,
    hourForecast: HourForecast[], //TODO change once you implement it!
    daily: any //TODO Change once you implement it!
    day: string,
    dateString: string,

    temperatureData: GraphData,
    precipationChanceData: GraphData
    windSpeedData: GraphData

}

export interface GraphData {
    values: number[],
    labels: string[]
}

export interface CurrentWeather {
    time: Date;
    temperature2m: number;
    weatherIcon: ImageData;
}

export interface ImageData {
    description: string,
    image: string
}

export interface Images {
    [key: string]: {
        day: ImageData;
        night: ImageData;
    };
}

export interface HourlyWeather {
    time: Date,
    temperature2m: number[],
    precipitationProbability: number[],
    precipitation: number[],
    weatherCode: string[],
    windSpeed10m: number[],
    windDirection10m: number[],
    weatherIcon: Images[]
}

export interface HourForecast {
    time: Date,
    temperature2m: number,
    precipitationProbability: number,
    precipitation: number,
    weatherCode: string,
    windSpeed10m: number,
    windDirection10m: number,
    weatherIcon: Images
}