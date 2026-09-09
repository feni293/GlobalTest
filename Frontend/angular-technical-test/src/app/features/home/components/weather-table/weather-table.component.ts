import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Weather } from '../../../../core/models/weather';

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [
    MatTableModule,
    DecimalPipe
  ],
  templateUrl: './weather-table.component.html',
  styleUrl: './weather-table.component.scss'
})
export class WeatherTableComponent {

  @Input({ required: true })
  weather: Weather[] = [];

  displayedColumns: string[] = [
    'city',
    'temperature',
    'weather',
    'wind'
  ];

  getWeatherDescription(code: number): string {

    if (code === 0) return 'Despejado';
    if ([1, 2, 3].includes(code)) return 'Parcialmente nublado';
    if ([45, 48].includes(code)) return 'Niebla';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Llovizna';
    if ([61, 63, 65, 66, 67].includes(code)) return 'Lluvia';
    if ([71, 73, 75, 77].includes(code)) return 'Nieve';
    if ([80, 81, 82].includes(code)) return 'Lluvia fuerte';
    if ([95, 96, 99].includes(code)) return 'Tormenta';

    return 'Desconocido';
  }

  getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if ([1, 2, 3].includes(code)) return '⛅';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 56, 57].includes(code)) return '🌦️';
    if ([61, 63, 65, 66, 67].includes(code)) return '🌧️';
    if ([71, 73, 75, 77].includes(code)) return '❄️';
    if ([80, 81, 82].includes(code)) return '🌦️';
    if ([95, 96, 99].includes(code)) return '⛈️';

    return 'Desconocido';
  }
}