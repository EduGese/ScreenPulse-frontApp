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
        movie.Title.toLowerCase().includes(title.toLowerCase())
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
  sortCollection(favorites: Movie[],item: string, sortDirection: string){
    if (item == 'Year') {
      if (sortDirection =='asc') {
        return favorites.sort((a, b) =>
          a.Year > b.Year ? 1 : b.Year > a.Year ? -1 : 0
        );
      } else {
        return favorites.sort((a, b) =>
          a.Year < b.Year ? 1 : b.Year < a.Year ? -1 : 0
        );
      }
      
    } else {
      if (sortDirection =='asc') {
        return favorites.sort((a, b) =>
            a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0
          );
      } else {
        return favorites.sort((a, b) =>
            a.Title < b.Title ? 1 : b.Title < a.Title ? -1 : 0
          );
      }
    }
  }

}
