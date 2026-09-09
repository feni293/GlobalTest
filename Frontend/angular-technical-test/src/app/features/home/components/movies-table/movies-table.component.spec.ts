import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MoviesTableComponent } from './movies-table.component';

describe('MoviesTableComponent', () => {
  let component: MoviesTableComponent;
  let fixture: ComponentFixture<MoviesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoviesTableComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});