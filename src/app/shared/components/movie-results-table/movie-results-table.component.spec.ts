import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemResultsTableComponent } from './movie-results-table.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('MediaItemResultsTableComponent', () => {
  let component: MediaItemResultsTableComponent;
  let fixture: ComponentFixture<MediaItemResultsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaItemResultsTableComponent],
      providers: [
        ToastrService 
      ],
      imports: [ToastrModule.forRoot({
      }),
      MatTableModule,
      MatPaginatorModule ]
    });
    fixture = TestBed.createComponent(MediaItemResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
