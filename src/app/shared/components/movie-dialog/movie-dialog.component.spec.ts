import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemDialogComponent } from './movie-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

describe('MediaItemDialogComponent', () => {
  let component: MediaItemDialogComponent;
  let fixture: ComponentFixture<MediaItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaItemDialogComponent],
      imports:[MatDialogModule, 
        ToastrModule.forRoot(),
         HttpClientModule,
         MatIconModule ],
      providers:[
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA,   useValue: {
          response: {
            Title: 'Película de prueba',
            Year: '2020',
            Poster: 'N/A',
            Director: 'Alguien',
            Actors: 'Actor 1, Actor 2',
            Plot: 'Un resumen',
            Genre: 'Drama',
            Language: 'Español',
            Country: 'España',
            Runtime: '120 min',
            imdbRating: '8.5',
            imdbVotes: '10,000'
          },
          fromFavoritesSection: false,
          movie: {}
        },
       } 
      ]
    });
    fixture = TestBed.createComponent(MediaItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
