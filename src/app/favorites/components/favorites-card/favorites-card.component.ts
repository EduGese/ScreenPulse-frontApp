import { Router } from '@angular/router';
import { FavoritesService } from './../../../shared/services/favorites/favorites.service';
import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesComponent } from '../../pages/favorites.component';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css'],
})
export class FavoritesCardComponent {
  @Input() favorites!: Movie[];
  favoritesAfterDeleteMovie = new Subject<Movie[]>();
  toggleMode = 'view';

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  deleteFavorite(_id: string) {
    this.favoritesService.deleteMovie(_id).subscribe(
      () => {
        console.log('Movie deleted successfully');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addDescription(movie: Movie, description: any, _id: string) {
    const movieUpdated = {
      _id: _id,
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Type: movie.Type,
      Poster: movie.Poster,
      description: description,
    };
    
    this.favoritesService.updateFavorite(movieUpdated).subscribe(
      () => {
        console.log('Movie updated successfully');
      },
      (error) => {
        console.error(error);
      }
    );
    this.toggleMode = 'view';
  }
}
