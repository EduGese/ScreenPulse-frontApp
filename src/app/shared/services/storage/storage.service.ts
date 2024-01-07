import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  favorites: Movie[] = [];
  filterdFavorites: Movie[] = [];

  favoritesAfterDeleteMovie = new Subject<Movie[]>();
  favoritesAfterUpdateMovie = new Subject<Movie>();

  constructor(private toastrService: ToastrService, private http: HttpClient) {}

  addToFavories(movie: Movie) {
    let favorites: Movie[] = [];
     this.getFavorites().subscribe(
        (movies) => (favorites = movies));
    const favoriteDuplicate = favorites.find((m) => m.imdbID === movie.imdbID);
    if (favoriteDuplicate) {
      this.toastrService.error(movie.Title, 'It was already in your list')
    } else {
       this.getFavorites().subscribe(
        (movies) => (this.favorites = movies));
      this.favorites.push(movie);
      const favoritesString = JSON.stringify(this.favorites);
      localStorage.setItem('favorites', favoritesString);
      this.toastrService.success(movie.Title, 'Added to favorites')
    }
  }
  getFavorites(): Observable <any> {
    // const favoritesString = localStorage.getItem('favorites');
    // return favoritesString ? JSON.parse(favoritesString) : [];
    const favorites = this.http.get<Movie[]>(environment.serverURL);
    return favorites;
  }
  addToFilterdFavories(movies: Movie[]) {
    this.filterdFavorites = [];
    this.filterdFavorites.push(...movies);
    const filteredFavoritesString = JSON.stringify(this.filterdFavorites);
    localStorage.setItem('filteredFavorites', filteredFavoritesString);
  }
  getFilteredFavorites(): Movie[] | [] {
    const filteredFavoritesString = localStorage.getItem('filteredFavorites');
    return filteredFavoritesString ? JSON.parse(filteredFavoritesString) : [];
  }
  deleteMovie(moviesUpdated: Movie[]) {
    let favorites: Movie[] = [];
    this.getFavorites().subscribe(
      (movies) => (favorites = movies));
    const moviesAfterDelete = moviesUpdated;
    localStorage.setItem('favorites', JSON.stringify(moviesAfterDelete));
    this.favoritesAfterDeleteMovie.next(favorites);
  }
  addReview(description: string, imdbID: string) {
    let favorites: Movie[] = [];
    this.getFavorites().subscribe(
      (movies) => (favorites = movies));
    const movieToUpdate = favorites.find((movie) => movie.imdbID === imdbID);
    if (!movieToUpdate) {
      throw new Error('Could not find movie to update');
    } else {
      movieToUpdate.description = description;
      const updatedMovie = { ...movieToUpdate, description };
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.favoritesAfterUpdateMovie.next(updatedMovie);
    }
  }
}
