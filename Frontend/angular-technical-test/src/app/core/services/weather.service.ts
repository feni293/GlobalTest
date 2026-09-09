import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Weather, WeatherApiResponse} from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getWeather(city: string, latitude: number, longitude: number): Observable<Weather> {

    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('current', 'temperature_2m,weather_code,wind_speed_10m');

    return this.http
      .get<WeatherApiResponse>(
        environment.weatherApiUrl,
        { params }
      )
      .pipe(
        map((response) => ({
          city,
          temperature: response.current.temperature_2m,
          weatherCode: response.current.weather_code,
          windSpeed: response.current.wind_speed_10m
        }))
      );
  }
}