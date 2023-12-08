import { Component, OnInit } from '@angular/core';
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
  type: string = 'all';
  year: string = '';//This field should be number in the form (create pipe to transform it?)

  constructor(private storageService: StorageService){}
  ngOnInit(): void {
    this.favorites = this.storageService.getFavorites();
  }

  onSubmit(){
    this.favorites = this.storageService.getFavorites();//Always recover all favorites before search
    if(!this.favorites || this.favorites.length === 0) {
      console.log('No favorites saved!'); //Add toast? add directive in view to render message to user?
    } else {
      let filteredFavorites = this.storageService.getFavorites();

      //filtr by year
     if (this.year) {
        filteredFavorites = filteredFavorites.filter(
          (movie) => movie.Year === this.year
        );
        if(filteredFavorites.length>0){
          this.storageService.addToFilterdFavories(filteredFavorites);
        }
      }
      //filter by type
      if (this.type !== 'all') {
        filteredFavorites = filteredFavorites.filter(
          (movie) => movie.Type === this.type
        );
        this.storageService.addToFilterdFavories(filteredFavorites);
      }

      //filter by title
      if(this.title){
        filteredFavorites =filteredFavorites.filter(
          (movie) =>movie.Title.startsWith(this.title)
        );
        this.storageService.addToFilterdFavories(filteredFavorites);
      }

      if(filteredFavorites.length === 0){//when donest find anything
        this.favorites = [];//Clear favorites, recover again (line 22)
      }else{
        this.favorites = filteredFavorites;
      }
      

    }
  }

}
