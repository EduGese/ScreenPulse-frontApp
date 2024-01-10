import { Router } from '@angular/router';
import { FavoritesService } from './../../../shared/services/favorites/favorites.service';
import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { FavoritesComponent } from '../../pages/favorites.component';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css']
})
export class FavoritesCardComponent {
  @Input () favorites!:Movie[];
  favoritesAfterDeleteMovie = new Subject<Movie[]>();
  toggleMode = 'view';

  constructor(private storageService: StorageService, private favoritesService: FavoritesService, private router: Router ){}


  deleteFavorite(_id: string){
    this.favoritesService.deleteMovie(_id).subscribe(
       () => {
        console.log('Movie deleted successfully');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addDescription(description: string, imdbID: string){
    this.storageService.addReview(description, imdbID);
    this.toggleMode = 'view';
  }
}
