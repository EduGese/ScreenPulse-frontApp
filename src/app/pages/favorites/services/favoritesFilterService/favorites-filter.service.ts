import { Injectable } from '@angular/core';
import { MediaItem } from 'src/app/shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesFilterService {

  constructor() { }

  filterBytitle(favorites: MediaItem[], title: string) {
    return favorites  
      .filter(movie => 
        movie.title.toLowerCase().includes(title.toLowerCase())
      )
      .map(movie => {
        const words = movie.title.split(' ');
        const capitalizedWords = words.map(word => {
          return word[0].toUpperCase() + word.substring(1).toLowerCase();  
        });
        movie.title = capitalizedWords.join(' ');
         return movie;
      });
  }
  sortCollection(favorites: MediaItem[],item: string, sortDirection: string){
    if (item == 'year') {
      if (sortDirection =='asc') {
        return favorites.sort((a, b) =>
          a.year > b.year ? 1 : b.year > a.year ? -1 : 0
        );
      } else {
        return favorites.sort((a, b) =>
          a.year < b.year ? 1 : b.year < a.year ? -1 : 0
        );
      }
      
    } else {
      if (sortDirection =='asc') {
        return favorites.sort((a, b) =>
            a.title > b.title ? 1 : b.title > a.title ? -1 : 0
          );
      } else {
        return favorites.sort((a, b) =>
            a.title < b.title ? 1 : b.title < a.title ? -1 : 0
          );
      }
    }
  }

}
