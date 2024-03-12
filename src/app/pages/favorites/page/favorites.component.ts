import { Component,  OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { MovieDialogComponent } from 'src/app/shared/components/movie-dialog/movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewportRuler } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  /*Favorties collection */
  favorites: Movie[] | [] = [];
  favoritesAll: Movie[] | [] = [];
  favoritesMovies: Movie[] | [] = [];
  favoritesSeries: Movie[] | [] = [];
  favoritesGames: Movie[] | [] = [];

  title: string = '';
  type: string = 'movie';
  year: string = '';
  yearInvalid = false;/*Eliminar??*/ 
  favoritesLoaded: boolean = false;

  /*Pagination atributes */
  page: number = 1;
  pageSize: number = 12;

  /*Sorting atributes*/ 
  yearSort: string = 'Year';
  typeSort: string = 'Type';
  titleSort: string = 'Title';
  favoritesType: string = '';
  sortDirection:string = '';

  favoritesFiltered: boolean = false;


  types: any[] = [
    { value: 'movie', viewValue: 'Movie' },
    { value: 'series', viewValue: 'Serie' },
    { value: 'game', viewValue: 'Game' },
    { value: 'all', viewValue: 'All' },
  ];
  

  constructor(
    private favoritesFilter: FavoritesFilterService,
    private toastrService: ToastrService,
    private favoritesService: FavoritesService,
    private OmdbService: OmdbService,
    private dialog: MatDialog,
    private viewportRuler: ViewportRuler
  ) {}

  ngOnInit(): void {
    this.loadAllFavorites();
    this.calculatePageSize();
    this.viewportRuler.change().subscribe(() => {
      this.calculatePageSize();
    });
  }
  calculatePageSize(): void {
    const viewportSize = this.viewportRuler.getViewportSize();
    if(viewportSize.width > 1400){
      this.pageSize = 16;
    }
    if(viewportSize.width < 800){
      this.pageSize = 9;
    }
  }
  filterByTitle(event:any){
    this.favoritesService.getFavorites().subscribe({
      next: (movies) => {
        this.favoritesAll = movies;
        if(!this.favoritesAll || this.favoritesAll.length === 0){
          return;
        }else{
          let filteredFavorites = this.favoritesAll;
          filteredFavorites = this.favoritesFilter.filterByTitle(
            filteredFavorites,
            event.target.value
          );
          if (filteredFavorites.length === 0) {
             this.favoritesFiltered = true;
            this.favoritesAll = [];
          } else {
            this.favoritesAll = filteredFavorites;
          }
        }
      },
      error: (error)=>{
        console.error(error);
        this.toastrService.error(error.error.message);
      }
    })
  }
  loadAllFavorites(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (movies) => {
        this.favorites = movies;
        this.favoritesAll = movies;
        this.favoritesLoaded = true;
        this.filterMoviesType();
      },
      error: (error) => {
        console.error(error);
        this.toastrService.error( error.error.message);
        this.favoritesLoaded = true;
      },
    });
  }
  getCollectionLength(collection: Movie[]) {
    return collection.length;
  }
  deleteFavorite(_id: string) {
    this.favoritesService.deleteMovie(_id).subscribe({
      next: () => {
        this.toastrService.success('Movie deleted');
        this.favorites = this.favorites.filter((movie) => movie._id != _id);
        this.favoritesMovies = this.favoritesMovies.filter(
          (movie) => movie._id != _id
        );
        this.favoritesSeries = this.favoritesSeries.filter(
          (movie) => movie._id != _id
        );
        this.favoritesGames = this.favoritesGames.filter(
          (movie) => movie._id != _id
        );
      },
      error: (error) => {
        this.toastrService.error('Cannot delete movie', error);
        console.error(error);
      },
    });
  }
  updateFavorite(info: any) {
    const { item, description } = info;
    const updatedMovie = { ...item, description: description };
    this.favoritesService.updateFavorite(updatedMovie).subscribe(
      () => {
        item.description = description;
        console.log('Movie updated successfully', updatedMovie);
        this.toastrService.success('succesfully updated', item.Title);
      },
      (error) => {
        console.error(error);
        this.toastrService.error(error.error.message);
      }
    );
  }
  openFavorite(favoriteMovieToOpen: any) {
    this.OmdbService.getMovieInfo(favoriteMovieToOpen.imdbID).subscribe({
      next: (response) => {
        const movieAndResponse = {
          movie: favoriteMovieToOpen,
          response: response,
        };
        console.log('Movie and response', movieAndResponse);
        const dialogRef = this.dialog.open(MovieDialogComponent, {
          data: movieAndResponse,
          height: '90%',
          width: '80%',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          autoFocus: false,
        });
        dialogRef.afterOpened().subscribe(() => {
          const imgElement = document.querySelector(
            '.poster img'
          ) as HTMLElement;
          if (imgElement) {
            imgElement.focus();
          }
        });
      },
      error: (error) => {
        this.toastrService.error(error.error.message);
      },
    });
  }
  filterMoviesType() {
    this.favoritesMovies = this.favorites.filter(
      (movie) => movie.Type === 'movie'
    );
    this.favoritesSeries = this.favorites.filter(
      (movie) => movie.Type === 'series'
    );
    this.favoritesGames = this.favorites.filter(
      (movie) => movie.Type === 'game'
    );
  }
  sortFavorites(favorites: Movie[], item: string, type:string, sortDirection: string) {
    this.favoritesType = type;
    this.sortDirection = sortDirection;
    switch (this.favoritesType) {
      case 'movie':
      this.favoritesMovies = this.favoritesFilter.sortCollection(favorites, item, sortDirection);
        break;
      case 'serie':
        this.favoritesSeries = this.favoritesFilter.sortCollection(favorites, item, sortDirection);
        break;
      case 'game':
        this.favoritesGames = this.favoritesFilter.sortCollection(favorites, item, sortDirection);
        break;
      default:
        this.favorites = this.favoritesFilter.sortCollection(favorites, item, sortDirection);
        break;
    }
  }
}
