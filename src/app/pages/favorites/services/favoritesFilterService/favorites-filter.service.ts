import { Injectable } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesFilterService {

  constructor() { }

  filterByYear(favorites: Movie[], year: string) {
    return favorites.filter(movie => movie.Year === year);
  }

  filterByType(favorites: Movie[], type: string) {
    return favorites.filter(movie => movie.Type === type);
  }

  filterByTitle(favorites: Movie[], title: string) {
    return favorites  
      .filter(movie => 
        movie.Title.toLowerCase().startsWith(title.toLowerCase())
      )
      .map(movie => {
        const words = movie.Title.split(' ');
        const capitalizedWords = words.map(word => {
          return word[0].toUpperCase() + word.substring(1).toLowerCase();  
        });
        movie.Title = capitalizedWords.join(' ');
         return movie;
      });
  }

}
