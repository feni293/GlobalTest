import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesResponse } from '../models/movie';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private readonly http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<MoviesResponse> {
    const params = new HttpParams()
      .set('api_key', environment.tmdbApiKey)
      .set('language', 'es-ES')
      .set('page', page);

    return this.http.get<MoviesResponse>(
      `${environment.tmdbBaseUrl}/movie/popular`,
      { params }
    );
  }

  searchMovies(query: string, page: number = 1): Observable<MoviesResponse> {
    const params = new HttpParams()
      .set('api_key', environment.tmdbApiKey)
      .set('language', 'es-ES')
      .set('query', query)
      .set('page', page);

    return this.http.get<MoviesResponse>(
      `${environment.tmdbBaseUrl}/search/movie`,
      { params }
    );
  }
}
