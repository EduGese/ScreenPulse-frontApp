import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  favorites: Movie[] | [] = [];
  title: string ='';
  type: string = '';
  year: string = '';

  favoritesSubscription: Subscription;

  constructor(private storageService: StorageService){
    this.favoritesSubscription = this.storageService.favoritesAfterDeleteMovie
      .subscribe(favorites => {
        this.favorites = favorites;   
     });
    
    this.storageService.favoritesAfterUpdateMovie.subscribe(movie => {

      const index = this.favorites.findIndex(m => m.imdbID == movie.imdbID);
    
      this.favorites[index] = movie;
    
    })

  }
  ngOnInit(): void {
    this.favorites = this.storageService.getFavorites();
    console.log(this.favorites)
  }

  onSubmit(){
    this.favorites = this.storageService.getFavorites();
    if(!this.favorites || this.favorites.length === 0) {
      console.log('No favorites saved!'); 
    } else {
      let filteredFavorites = this.storageService.getFavorites();

    
     if (this.year) {
        filteredFavorites = filteredFavorites.filter(
          (movie) => movie.Year === this.year
        );
        if(filteredFavorites.length>0){
          this.storageService.addToFilterdFavories(filteredFavorites);
        }
      }
   
      if (this.type !== 'all') {
        filteredFavorites = filteredFavorites.filter(
          (movie) => movie.Type === this.type
        );
        this.storageService.addToFilterdFavories(filteredFavorites);
      }

    
      if (this.title) {
        filteredFavorites = filteredFavorites
          .filter((movie) =>
            movie.Title.toLowerCase().startsWith(this.title.toLowerCase())
          )
          .map((movie) => {
          
            const words = movie.Title.split(' ');

            const capitalizedWords = words.map((word) => {
              return word[0].toUpperCase() + word.substring(1).toLowerCase();
            });

            movie.Title = capitalizedWords.join(' ');
            return movie;
          });

        this.storageService.addToFilterdFavories(filteredFavorites);
      }

      if(filteredFavorites.length === 0){
        this.favorites = [];
      }else{
        this.favorites = filteredFavorites;
      }
    }
  }
}
