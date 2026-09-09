import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get weather for a city', () => {
    const mockApiResponse = {
      current: {
        temperature_2m: 18.5,
        weather_code: 3,
        wind_speed_10m: 12.4
      }
    };

    service
      .getWeather('Bogotá', 4.7110, -74.0721)
      .subscribe((weather) => {
        expect(weather.city).toBe('Bogotá');
        expect(weather.temperature).toBe(18.5);
        expect(weather.weatherCode).toBe(3);
        expect(weather.windSpeed).toBe(12.4);
      });

    const request = httpMock.expectOne(
      (req) => req.url.includes('/v1/forecast')
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('latitude')).toBe('4.711');
    expect(request.request.params.get('longitude')).toBe('-74.0721');
    expect(request.request.params.get('current'))
      .toBe('temperature_2m,weather_code,wind_speed_10m');

    request.flush(mockApiResponse);
  });
});