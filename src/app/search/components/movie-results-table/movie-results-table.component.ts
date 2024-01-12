import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/shared/models/movie.model';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';


@Component({
  selector: 'app-movie-results-table',
  templateUrl: './movie-results-table.component.html',
  styleUrls: ['./movie-results-table.component.css']
})
export class MovieResultsTableComponent {
@Input () results!:Movie[];
displayedColumns: string[] = ['Title', 'Year', 'Type', 'IMDbId', 'Poster', 'Add'];



constructor(private toastrService: ToastrService, private favoritesService: FavoritesService){}


addToFavories(movie:Movie){
//this.storageService.addToFavorites(movie);
this.favoritesService.addToFavorites(movie).subscribe(
  () => {
    this.toastrService.success(movie.Title, 'Added to favorites');
  },
  (error) => {
    console.error('Error:', error);
    if (error.message === 'Element duplicated') {
      this.toastrService.error(movie.Title, 'It is already in your list');
    } 
  }
);

}


}


