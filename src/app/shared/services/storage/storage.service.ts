import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  favorites: Movie[] = [];
  filterdFavorites: Movie[] = [];

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
//Save temporal filtered favorites
  addToFilterdFavories(movies: Movie[]) {
    this.filterdFavorites = [];//Empty array to overwrite array
    this.filterdFavorites.push(...movies);
    const filteredFavoritesString = JSON.stringify(this.filterdFavorites);
    localStorage.setItem('filteredFavorites', filteredFavoritesString);
  }
  getFilteredFavorites():Movie[] | [] {
    const filteredFavoritesString = localStorage.getItem('filteredFavorites');
    return filteredFavoritesString ? JSON.parse(filteredFavoritesString) : [];
  }




}
