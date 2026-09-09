export interface Weather {
  city: string;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
}

export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}