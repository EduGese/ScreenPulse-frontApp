import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  favorites: Movie[] = [];

  constructor() {}

  addToFavories(movie: Movie) {
    this.favorites.push(movie);
    const favoritesString = JSON.stringify(this.favorites);
    localStorage.setItem('favorites', favoritesString);
  }
  getFavorites() {
    const favoritesString = localStorage.getItem('favorites');
    if(favoritesString != null){
      const favorites = JSON.parse(favoritesString);
      return favorites;
    }else{
      return null;
    }
  }

}
