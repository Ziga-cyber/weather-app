export interface WeatherParams {
    latitude: number;
    longitude: number;
    hourly: string[];
    current: string[];
    daily: string[];
    timezone: string;
}