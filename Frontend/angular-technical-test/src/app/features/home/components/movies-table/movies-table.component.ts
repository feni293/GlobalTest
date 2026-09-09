import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Movie } from '../../../../core/models/movie';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-movies-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DecimalPipe
  ],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})
export class MoviesTableComponent {
  @Input({ required: true })
  movies: Movie[] = [];

  @Input()
  totalMovies = 0;

  @Output() pageChange = new EventEmitter<number>();

  readonly imageBaseUrl = environment.tmdbImageUrl;

  displayedColumns: string[] = [
    'poster',
    'title',
    'releaseDate',
    'rating'
  ];

  onPageChange(pageIndex: number): void {
    this.pageChange.emit(pageIndex + 1);
  }
}
