import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { MoviesService } from '../../core/services/movies.service';
import { WeatherService } from '../../core/services/weather.service';

describe('HomeComponent', () => {
  let moviesServiceMock: jasmine.SpyObj<MoviesService>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', [
      'getPopularMovies',
      'searchMovies'
    ]);

    weatherServiceMock = jasmine.createSpyObj('WeatherService', [
      'getWeather'
    ]);

    moviesServiceMock.getPopularMovies.and.returnValue(
      of({
        page: 1,
        results: [
          {
            id: 1,
            title: 'Test Movie',
            release_date: '2026-01-01',
            vote_average: 8.5,
            poster_path: '/poster.jpg',
            overview: 'Test overview'
          }
        ],
        total_pages: 1,
        total_results: 1
      })
    );

    moviesServiceMock.searchMovies.and.returnValue(
      of({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0
      })
    );

    weatherServiceMock.getWeather.and.returnValue(
      of({
        city: 'Bogotá',
        temperature: 18.5,
        weatherCode: 0,
        windSpeed: 10
      })
    );

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MoviesService,
          useValue: moviesServiceMock
        },
        {
          provide: WeatherService,
          useValue: weatherServiceMock
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should load popular movies on initialization', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(moviesServiceMock.getPopularMovies).toHaveBeenCalledWith(1);
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Test Movie');
    expect(component.totalMovies).toBe(1);
  });
});