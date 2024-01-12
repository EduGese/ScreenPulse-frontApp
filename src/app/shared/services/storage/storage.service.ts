import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  favorites: Movie[] = [];
  filterdFavorites: Movie[] = [];

  favoritesAfterDeleteMovie = new Subject<Movie[]>();
  favoritesAfterUpdateMovie = new Subject<Movie>();

  constructor(private toastrService: ToastrService, private http: HttpClient, private favoritesService: FavoritesService) {}

  // addToFavorites(movie: Movie){
  //   this.favoritesService.addToFavorites(movie).subscribe(
  //         () => {
  //           this.toastrService.success(movie.Title, 'Added to favorites');
  //         },
  //         (error) => {
  //           console.error('Error:', error);
  //           if (error.message === 'Element duplicated') {
  //             this.toastrService.error(movie.Title, 'It is already in your list');
  //           } 
  //         }
  //       );
  // }
  getFavorites(): Observable <any> {
    return this.favoritesService.getFavorites();
  }


  // addToFilterdFavories(movies: Movie[]) {
  //   this.filterdFavorites = [];
  //   this.filterdFavorites.push(...movies);
  //   const filteredFavoritesString = JSON.stringify(this.filterdFavorites);
  //   localStorage.setItem('filteredFavorites', filteredFavoritesString);
  // }


  // getFilteredFavorites(): Movie[] | [] {
  //   const filteredFavoritesString = localStorage.getItem('filteredFavorites');
  //   return filteredFavoritesString ? JSON.parse(filteredFavoritesString) : [];
  // }


  // deleteMovie(moviesUpdated: Movie[]) {
  //   let favorites: Movie[] = [];
  //   this.getFavorites().subscribe(
  //     (movies) => (favorites = movies));
  //   const moviesAfterDelete = moviesUpdated;
  //   localStorage.setItem('favorites', JSON.stringify(moviesAfterDelete));
  //   this.favoritesAfterDeleteMovie.next(favorites);
  // }


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
