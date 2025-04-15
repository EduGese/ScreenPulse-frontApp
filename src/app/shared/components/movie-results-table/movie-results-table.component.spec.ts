import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieResultsTableComponent } from './movie-results-table.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('MovieResultsTableComponent', () => {
  let component: MovieResultsTableComponent;
  let fixture: ComponentFixture<MovieResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieResultsTableComponent],
      providers: [
        ToastrService 
      ],
      imports: [ToastrModule.forRoot({
      }),
      MatTableModule,
      MatPaginatorModule ]
    });
    fixture = TestBed.createComponent(MovieResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
