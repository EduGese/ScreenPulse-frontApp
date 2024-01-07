import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
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

  types:any[] = [
    {value: 'movie', viewValue: 'Movie'},
    {value: 'series', viewValue: 'Serie'},
    {value: 'game', viewValue: 'Game'},
    {value: 'all', viewValue: 'All'}
  ];

  subscriptions: Subscription[] = [];

  constructor(
    private storageService: StorageService,
    private favoritesFilter: FavoritesFilterService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const favoritesAfterDeleteMovie =
      this.storageService.favoritesAfterDeleteMovie.subscribe((favorites) => {
        this.favorites = favorites;
        this.subscriptions.push(favoritesAfterDeleteMovie);
      });

    const favoritesAfterUpdateMovie =
      this.storageService.favoritesAfterUpdateMovie.subscribe((movie) => {
        const index = this.favorites.findIndex((m) => m.imdbID == movie.imdbID);
        this.favorites[index] = movie;
        this.subscriptions.push(favoritesAfterUpdateMovie);
      });

      this.storageService.getFavorites().subscribe(
        (movies) => {
          this.favorites = movies;
          console.log('Favoritos',this.favorites);
        },
        (error)=>{
          console.error('Error obteniendo favoritos:', error);
        });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSubmit() {
    if(this.year && !/^[0-9]{4}$/.test(this.year)) {
      this.toastrService.error('Year must be a 4 digit number');
      return; 
    }
    //this.favorites = this.storageService.getFavorites();
    this.storageService.getFavorites().subscribe(
      (movies) => {
        this.favorites = movies;
        console.log('Favoritos despues de find',this.favorites);
        if (!this.favorites || this.favorites.length === 0) {
          console.log('No favorites saved!');
        } else {
          let filteredFavorites = this.favorites;
    
          if (this.year) {
            filteredFavorites = this.favoritesFilter.filterByYear(
              filteredFavorites,
              this.year
            );
            console.log('Favoritos despues de filtro de year', filteredFavorites);
          }
    
          if (this.type !== 'all') {
            filteredFavorites = this.favoritesFilter.filterByType(
              filteredFavorites,
              this.type
            );
            console.log('Favoritos despues de filtro de type', filteredFavorites);
            this.storageService.addToFilterdFavories(filteredFavorites);
          }
          // if (this.title) {
          //   filteredFavorites = this.favoritesFilter.filterByTitle(
          //     filteredFavorites,
          //     this.title
          //   );
          //   this.storageService.addToFilterdFavories(filteredFavorites);
          // }
    
          if (filteredFavorites.length === 0) {
            this.favorites = [];
            this.toastrService.error('Nothing found with that filter criteria');
          } else {
            this.favorites = filteredFavorites;
          }
          console.log('Favoritos despues de filtro', this.favorites);
        }
        
      },
      (error)=>{
        console.error('Error obteniendo favoritos:', error);
      });
    
  }
  onClear() {
    this.title = '';
    this.type = 'movie';
    this.year = '';
  }
  getAllfavorites() {
    // let favorites: Movie[] = [];
    //  this.storageService.getFavorites().subscribe(
    //     (movies) => (favorites = movies));
    return this.favorites.length;
  }

}
