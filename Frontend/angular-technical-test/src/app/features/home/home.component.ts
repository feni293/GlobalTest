import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { Movie } from '../../core/models/movie';
import { MoviesTableComponent } from './components/movies-table/movies-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, switchMap, catchError, finalize, of, forkJoin } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Weather } from '../../core/models/weather';
import { WeatherService } from '../../core/services/weather.service';
import { City } from '../../core/models/city';
import { MatTabsModule } from '@angular/material/tabs';
import { WeatherTableComponent } from './components/weather-table/weather-table.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MoviesTableComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    WeatherTableComponent,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly moviesService = inject(MoviesService);
  private readonly weatherService = inject(WeatherService);
  
  private weatherLoaded = false;

  movies: Movie[] = [];
  totalMovies = 0;
  currentPage = 1;

  searchControl = new FormControl('', {
    nonNullable: true
  });

  weatherSearchControl = new FormControl('', { 
    nonNullable: true 
  });

  filteredWeather: Weather[] = [];

  isMoviesLoading = false;
  isWeatherLoading = false;

  moviesError = '';
  weatherError = '';

  readonly cities: City[] = [
    {
      name: 'Bogotá',
      latitude: 4.7110,
      longitude: -74.0721
    },
    {
      name: 'Medellín',
      latitude: 6.2442,
      longitude: -75.5812
    },
    {
      name: 'Cali',
      latitude: 3.4516,
      longitude: -76.5320
    },
    {
      name: 'Cartagena',
      latitude: 10.3910,
      longitude: -75.4794
    },
    {
      name: 'Barranquilla',
      latitude: 10.9685,
      longitude: -74.7813
    }
  ];

  weather: Weather[] = [];

  ngOnInit(): void {
    this.loadMovies();
    this.setupSearch();
    this.setupWeatherSearch();
  }

  onPageChange(page: number): void {
    const query = this.searchControl.value.trim();

    if (query) {
      this.searchMovies(query, page);
      return;
    }

    this.loadMovies(page);
  }

  private loadMovies(page: number = 1): void {
    this.isMoviesLoading = true;
    this.moviesError = '';

    this.moviesService
      .getPopularMovies(page)
      .pipe(
        finalize(() => {
          this.isMoviesLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalMovies = response.total_results;
          this.currentPage = response.page;
        },
        error: () => {
          this.movies = [];
          this.totalMovies = 0;
          this.moviesError = 'Unable to load movies.';
        }
      });
  }

  private searchMovies(query: string, page: number): void {
    this.isMoviesLoading = true;
    this.moviesError = '';

    this.moviesService
      .searchMovies(query, page)
      .pipe(
        finalize(() => {
          this.isMoviesLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalMovies = response.total_results;
          this.currentPage = response.page;
        },
        error: () => {
          this.movies = [];
          this.totalMovies = 0;
          this.moviesError = 'Unable to search movies.';
        }
      });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
         takeUntilDestroyed(this.destroyRef),
        switchMap((query) => {
          const searchTerm = query.trim();

          this.isMoviesLoading = true;
          this.moviesError = '';

          const request$ = searchTerm
            ? this.moviesService.searchMovies(searchTerm, 1)
            : this.moviesService.getPopularMovies(1);

          return request$.pipe(
            catchError(() => {
              this.movies = [];
              this.totalMovies = 0;
              this.moviesError = 'Unable to load movies.';
              return of(null);
            }),
            finalize(() => {
              this.isMoviesLoading = false;
            })
          );
        })
      )
      .subscribe((response) => {
        if (!response) {
          return;
        }

        this.movies = response.results;
        this.totalMovies = response.total_results;
        this.currentPage = response.page;
      });
  }

  private loadWeather(): void {
    this.isWeatherLoading = true;
    this.weatherError = '';

    const requests = this.cities.map((city) =>
      this.weatherService.getWeather(
        city.name,
        city.latitude,
        city.longitude
      )
    );

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.isWeatherLoading = false;
        })
      )
      .subscribe({
        next: (weather) => {
          this.weather = weather;
          this.filteredWeather = weather;
        },
        error: () => {
          this.weather = [];
          this.weatherError = 'Unable to load weather data.';
        }
      });
  }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 1 && !this.weatherLoaded) {
      this.weatherLoaded = true;
      this.loadWeather();
    }
  }

  private setupWeatherSearch(): void {
    this.weatherSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) => {
        const searchTerm = query.trim().toLowerCase();

        this.filteredWeather = this.weather.filter((item) =>
          item.city.toLowerCase().includes(searchTerm)
        );
      });
  }

  retryWeather(): void {
    this.loadWeather();
  }
}
