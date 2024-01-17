
import { FavoritesService } from './../../../shared/services/favorites/favorites.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from 'src/app/shared/models/movie.model';



@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css'],
})
export class FavoritesCardComponent {
  @Input() items!: any[];
  @Output() itemIdEvent = new EventEmitter<string>();

  toggleMode = 'view';

  constructor(
    private favoritesService: FavoritesService) {}

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
  sendItemId(id: string) {//Sends Item id to parent component in order to be deleted from parent component
    this.itemIdEvent.emit(id);
  }
}
