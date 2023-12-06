import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieResultsTableComponent } from './movie-results-table.component';

describe('MovieResultsTableComponent', () => {
  let component: MovieResultsTableComponent;
  let fixture: ComponentFixture<MovieResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieResultsTableComponent]
    });
    fixture = TestBed.createComponent(MovieResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
