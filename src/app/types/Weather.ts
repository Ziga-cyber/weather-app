export interface Weather {
    currentWeather: CurrentWeather,
    hourForecast: HourForecast[],
    dayForecast: DayForecast[],
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
    weatherCode: string,
    windSpeed10m: number,
    windDirection10m: number,
    weatherIcon: Images,
    id: number
}

export interface DayForecast {
    time: Date
    temperature2m: number,
    precipitationProbability: number,
    weatherCode: string,
    temperature2d: number,
    weatherIcon: Images,
}