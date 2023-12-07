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
  getFavorites():Movie[] | [] {
    const favoritesString = localStorage.getItem('favorites');
    return favoritesString ? JSON.parse(favoritesString) : [];
  }
}
