import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  favorites: Movie[] = [];
  filterdFavorites: Movie[] = [];

  favoritesAfterDeleteMovie = new Subject<Movie[]>();
  favoritesAfterUpdateMovie = new Subject<Movie>();

  constructor() {}

  addToFavories(movie: Movie) {
    this.favorites = this.getFavorites();
    this.favorites.push(movie);
    const favoritesString = JSON.stringify(this.favorites);
    localStorage.setItem('favorites', favoritesString);
  }
  getFavorites():Movie[] | [] {
    const favoritesString = localStorage.getItem('favorites');
    return favoritesString ? JSON.parse(favoritesString) : [];
  }
  addToFilterdFavories(movies: Movie[]) {
    this.filterdFavorites = [];
    this.filterdFavorites.push(...movies);
    const filteredFavoritesString = JSON.stringify(this.filterdFavorites);
    localStorage.setItem('filteredFavorites', filteredFavoritesString);
  }
  getFilteredFavorites():Movie[] | [] {
    const filteredFavoritesString = localStorage.getItem('filteredFavorites');
    return filteredFavoritesString ? JSON.parse(filteredFavoritesString) : [];
  }
  deleteMovie(moviesUpdated: Movie[]){
    const moviesAfterDelete= moviesUpdated;
    localStorage.setItem('favorites', JSON.stringify(moviesAfterDelete));
    this.favoritesAfterDeleteMovie.next(this.getFavorites());
  }
  addReview(description: string, imdbID: string){
    const favorites = this.getFavorites();
    const movieToUpdate = favorites.find(movie => movie.imdbID === imdbID);
    if(!movieToUpdate) {
      throw new Error('Could not find movie to update'); 
    }else{
      movieToUpdate.description = description;
      const updatedMovie = {...movieToUpdate, description}; 
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.favoritesAfterUpdateMovie.next(updatedMovie);
    }

  }
}
