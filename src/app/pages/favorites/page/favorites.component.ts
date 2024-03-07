import { Component,  OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesFilterService } from '../services/favoritesFilterService/favorites-filter.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { OmdbService } from 'src/app/shared/services/omdb/omdb.service';
import { MovieDialogComponent } from 'src/app/shared/components/movie-dialog/movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
  favoritesLoaded: boolean = false;

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
    private dialog: MatDialog
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
    this.favoritesService.getFavorites().subscribe({
      next:(movies) => {
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
            this.toastrService.warning('Nothing found with that filter criteria');
          } else {
            this.favorites = filteredFavorites;
          }
        }
      },
      error: (error) => {
        console.error(error);
        this.toastrService.error(error.error.message);
      }
  });
  }
  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (movies) => {
        this.favorites = movies;
        this.favoritesLoaded = true;
        
      },
     error: (error) => {
        console.error(error);
        //this.toastrService.error( error.error.message);
        this.favoritesLoaded = true;
      }
  });
  }
  getAllfavorites() {
    return this.favorites.length;
  }
  deleteFavorite(_id: string) {
    this.favoritesService.deleteMovie(_id).subscribe({
      next: () => {
        this.toastrService.success("Movie deleted");
        this.favorites = this.favorites.filter((movie) => movie._id != _id);
      },
      error: (error) => {
        this.toastrService.error("Cannot delete movie", error);
        console.error(error);
      }
  });
  }
  updateFavorite(info: any) {
    const { item, description } = info;
    const updatedMovie ={...item, description: description};
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
  openFavorite(favoriteMovieToOpen: any){
    console.log('favoriteMovieToOpen',favoriteMovieToOpen);
    this.OmdbService.getMovieInfo(favoriteMovieToOpen.imdbID).subscribe({
      next:(response) => {
        const movieAndResponse = {
          movie: favoriteMovieToOpen,
          response: response
        };
        console.log('Movie and response', movieAndResponse);
        const dialogRef = this.dialog.open(MovieDialogComponent, {
          data: movieAndResponse,
          height: '90%',
          width: '80%',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '500ms',
          autoFocus: false ,
        });
        dialogRef.afterOpened().subscribe(() => {
          const imgElement = document.querySelector('.poster img') as HTMLElement;
          if (imgElement) {
            imgElement.focus();
          }
        });
      },
      error:(error) => {
        this.toastrService.error(error.error.message);
      }
    });
  }
}
