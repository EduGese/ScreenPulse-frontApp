import { Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';


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
  favoritesLoaded: boolean = false;
  userName: string | null = '';

  /*Pagination atributes */
  page: number = 1;
  pageSize: number = 12;

  /*Sorting atributes*/
  yearSort: string = 'Year';
  typeSort: string = 'Type';
  titleSort: string = 'Title';
  favoritesType: string = '';
  sortDirection: string = '';

  /*scroll*/
  @ViewChild('scrl') scrl!: ElementRef | undefined;
  @ViewChild('scrlMovies') scrlMovies: ElementRef | undefined;
  @ViewChild('scrlSeries') scrlSeries: ElementRef | undefined;
  @ViewChild('scrlGames') scrlGames: ElementRef | undefined;
  scrollX: number = 0;
  scrollEnd: boolean = false;

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
    private viewportRuler: ViewportRuler,
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadAllFavorites();
    this.calculatePageSize();
    this.viewportRuler.change().subscribe(() => {
      this.calculatePageSize();
    });
    this.userName = this.authService.getUserName();
  }
  scrollable(collection:string): boolean{
    let element = this.scrlMovies;
    let scrollable = false;
    switch (collection) {
      case 'movies':
        element = this.scrlMovies;
        scrollable = element?.nativeElement.scrollWidth > element?.nativeElement.clientWidth;
        break;
      case 'series':
        element = this.scrlSeries;
        scrollable = element?.nativeElement.scrollWidth > element?.nativeElement.clientWidth;
        break;
      case 'games':
        element = this.scrlGames;
        scrollable = element?.nativeElement.scrollWidth > element?.nativeElement.clientWidth;
        break;
      default:
        break;
    }
    return scrollable;
  }

  slide(shift: number, collection: string) {
    let element = this.scrl;
    switch (collection) {
      case 'all':
        element = this.scrl;
        break;
      case 'movies':
        element = this.scrlMovies;
        break;
      case 'series':
        element = this.scrlSeries;

        break;
      case 'games':
        element = this.scrlGames;
        break;
      default:
        break;
    }

    if (element) {
      element.nativeElement.scrollBy({
        left: shift,
        behavior: 'smooth',
      });

      element.nativeElement.scrollLeft += shift;
      this.scrollX += shift;

      this.scrollCheck(collection);
    }
  }

  scrollCheck(collection: string) {

    let element = this.scrl;
    switch (collection) {
      case 'all':
        element = this.scrl;
        break;
      case 'movies':
        element = this.scrlMovies;
        break;
      case 'series':
        element = this.scrlSeries;
        break;
      case 'games':
        element = this.scrlGames;
        break;
      default:
        break;
    }

    if (element) {
      this.scrollX = element.nativeElement.scrollLeft;
      this.scrollEnd =
        Math.floor(
          element.nativeElement.scrollWidth - element.nativeElement.scrollLeft
        ) <= element.nativeElement.offsetWidth;
    }
  }

  calculatePageSize(): void {
    const viewportSize = this.viewportRuler.getViewportSize();
    if (viewportSize.width > 1400) {
      this.pageSize = 16;
    }
    if (viewportSize.width < 800) {
      this.pageSize = 9;
    }
  }
  filterByTitle(event: any) {
    this.favoritesService.getFavorites().subscribe({
      next: (movies) => {
        this.favoritesAll = movies;
        if (!this.favoritesAll || this.favoritesAll.length === 0) {
          return;
        } else {
          let filteredFavorites = this.favoritesAll;
          filteredFavorites = this.favoritesFilter.filterByTitle(
            filteredFavorites,
            event.target.value
          );
          if (filteredFavorites.length === 0) {
            this.favoritesAll = [];
          } else {
            this.favoritesAll = filteredFavorites;
          }
        }
      },
      error: (error) => {
        console.error(error);
        this.toastrService.error(error.error.message);
      },
    });
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
        this.favoritesAll = this.favoritesAll.filter(
          (movie) => movie._id != _id
        );
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
    this.dialogService.openMovie(window.innerWidth, favoriteMovieToOpen);
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
  sortFavorites(
    favorites: Movie[],
    item: string,
    type: string,
    sortDirection: string
  ) {
    this.favoritesType = type;
    this.sortDirection = sortDirection;
    switch (this.favoritesType) {
      case 'movie':
        this.favoritesMovies = this.favoritesFilter.sortCollection(
          favorites,
          item,
          sortDirection
        );
        break;
      case 'serie':
        this.favoritesSeries = this.favoritesFilter.sortCollection(
          favorites,
          item,
          sortDirection
        );
        break;
      case 'game':
        this.favoritesGames = this.favoritesFilter.sortCollection(
          favorites,
          item,
          sortDirection
        );
        break;
      default:
        this.favoritesAll = this.favoritesFilter.sortCollection(
          favorites,
          item,
          sortDirection
        );
        break;
    }
  }
}
