import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.css']
})
export class FavoritesCardComponent {
  @Input () favorites!:Movie[];
  toggleMode = 'view';

  constructor(private storageService: StorageService){}


  deleteFavorite(imdbID: string){
    const favorites = this.storageService.getFavorites();
    this.storageService.deleteMovie(favorites.filter(movie => movie.imdbID !== imdbID))
  }
  addDescription(description: string, imdbID: string){
    this.storageService.addReview(description, imdbID);
    this.toggleMode = 'view'
  }
}
