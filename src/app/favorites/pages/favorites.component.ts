import { FavoritesService } from './../../shared/services/favorites/favorites.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Movie[] | [] = [];
  title: string = '';
  type: string = 'movie';
  year: string = '';
  yearInvalid = false;

  types: any[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'Serie', viewValue: 'Serie' },
    { value: 'game', viewValue: 'Game' },
    { value: 'all', viewValue: 'All' },
  ];

  subscriptions: Subscription[] = []; //Eliminar, ya no hay subscripciones

  constructor(
    private favoritesFilter: FavoritesFilterService,
    private toastrService: ToastrService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  ngOnDestroy() {
    //Eliminar, ya no hay subscripciones
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSubmit() {
    if (this.year && !/^[0-9]{4}$/.test(this.year)) {
      this.toastrService.error('Year must be a 4 digit number');
      return;
    }
    this.favoritesService.getFavorites().subscribe(
      (movies) => {
        this.favorites = movies;
        if (!this.favorites || this.favorites.length === 0) {
          return;
        } else {
          let filteredFavorites = this.favorites;

          if (this.year) {
            filteredFavorites = this.favoritesFilter.filterByYear(
              filteredFavorites,
              this.year
            );
          }

          if (this.type !== 'all') {
            filteredFavorites = this.favoritesFilter.filterByType(
              filteredFavorites,
              this.type
            );
          }
          if (this.title) {
            filteredFavorites = this.favoritesFilter.filterByTitle(
              filteredFavorites,
              this.title
            );
          }

          if (filteredFavorites.length === 0) {
            this.favorites = [];
            this.toastrService.error('Nothing found with that filter criteria');
          } else {
            this.favorites = filteredFavorites;
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onClear() {
    this.title = '';
    this.type = 'movie';
    this.year = '';
  }
  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe(
      (movies) => {
        this.favorites = movies;
        console.log('Favoritos', this.favorites);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // subscribeToDeletedEvent(): void {
  //   const favoriteDeleted = this.favoritesService.favoriteDeleted.subscribe(
  //     (id: string) => {
  //       this.removeFavoriteFromList(id);
  //     }
  //   );
  //   this.subscriptions.push(favoriteDeleted);
  // }
  // subscribeToUpdateEvent(): void {
  //   const favoriteUpdated = this.favoritesService.favoriteUpdated.subscribe(
  //     async (movie: Movie) => {
  //       const movieIndex = this.favorites.findIndex(
  //         (fav) => fav._id === movie._id
  //       );
  //       this.favorites[movieIndex].description = movie.description;
  //     }
  //   );
  //   this.subscriptions.push(favoriteUpdated);
  // }
  // removeFavoriteFromList(id: string): void {
  //   this.favorites = this.favorites.filter((movie) => movie._id != id);
  // }
  getAllfavorites() {
    return this.favorites.length;
  }
  deleteFavorite(_id: string) {
    this.favoritesService.deleteMovie(_id).subscribe(
      () => {
        console.log('Movie deleted successfully');
        this.favorites = this.favorites.filter((movie) => movie._id != _id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateFavorite(info: any) {
    const { item, description } = info;
    const updatedMovie ={...item, description: description};
    this.favoritesService.updateFavorite(item).subscribe(
      () => {
        item.description = description;
        console.log('Movie updated successfully', updatedMovie);
        this.toastrService.success('succesfully updated', item.Title);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
