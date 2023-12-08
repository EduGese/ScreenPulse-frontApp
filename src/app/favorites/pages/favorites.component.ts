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
  year: string = '';//Este campo en el formulario deberia ser number y luego crear  pipe para transformarlo a string

  constructor(private storageService: StorageService){}
  ngOnInit(): void {
    this.favorites = this.storageService.getFavorites();
  }

  onSubmit(){
    if(!this.favorites || this.favorites.length === 0) {
      console.log('No favorites saved!'); 
    } else {
      let filteredFavorites = this.storageService.getFavorites();

      //filtrado por year
     if (this.year) {
        filteredFavorites = filteredFavorites.filter(
          (movie) => movie.Year === this.year
        );
      }

      this.favorites = filteredFavorites;

    }
  }

}
