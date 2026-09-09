import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { MoviesResponse } from '../models/movie';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get popular movies', () => {
    const mockResponse: MoviesResponse = {
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
    };

    service.getPopularMovies(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.results.length).toBe(1);
      expect(response.results[0].title).toBe('Test Movie');
    });

    const request = httpMock.expectOne(
      (req) => req.url.includes('/movie/popular')
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('page')).toBe('1');
    expect(request.request.params.get('language')).toBe('es-ES');

    request.flush(mockResponse);
  });

  it('should search movies', () => {
    const mockResponse: MoviesResponse = {
      page: 1,
      results: [
        {
          id: 2,
          title: 'Batman',
          release_date: '2026-02-01',
          vote_average: 9,
          poster_path: '/batman.jpg',
          overview: 'Batman movie'
        }
      ],
      total_pages: 1,
      total_results: 1
    };

    service.searchMovies('Batman', 1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.results[0].title).toBe('Batman');
    });

    const request = httpMock.expectOne(
      (req) => req.url.includes('/search/movie')
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('query')).toBe('Batman');
    expect(request.request.params.get('page')).toBe('1');
    expect(request.request.params.get('language')).toBe('es-ES');

    request.flush(mockResponse);
  });
});