import { Component,  OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit{
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


  constructor(
    private favoritesFilter: FavoritesFilterService,
    private toastrService: ToastrService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  onSubmit(info:any) {
    let {title, type, year} = info;
    if (year && !/^[0-9]{4}$/.test(year)) {
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

          if (year) {
            filteredFavorites = this.favoritesFilter.filterByYear(
              filteredFavorites,
              year
            );
          }

          if (type !== 'all') {
            filteredFavorites = this.favoritesFilter.filterByType(
              filteredFavorites,
              type
            );
          }
          if (title) {
            filteredFavorites = this.favoritesFilter.filterByTitle(
              filteredFavorites,
              title
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
        this.toastrService.error("Cannot filter", error);
      }
    );
  }
  // onClear() {
  //   this.title = '';
  //   this.type = 'movie';
  //   this.year = '';
  // }
  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe(
      (movies) => {
        this.favorites = movies;
      },
      (error) => {
        console.error(error);
        this.toastrService.error("Cannot load favorites", error);
      }
    );
  }
  getAllfavorites() {
    return this.favorites.length;
  }
  deleteFavorite(_id: string) {
    this.favoritesService.deleteMovie(_id).subscribe(
      () => {
        this.toastrService.success("Movie deleted");
        this.favorites = this.favorites.filter((movie) => movie._id != _id);
      },
      (error) => {
        this.toastrService.error("Cannot delete movie", error);
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
        this.toastrService.error('Cannot update movie', error);
      }
    );
  }
}
